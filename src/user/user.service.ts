import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  AdminVerifier,
  QueueRegister,
} from '../queue-user-registration/entities/queue-register.entity';
import { Church } from 'src/church/entities/church.entity';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { Policy } from 'src/policy/entities/policy.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UserRegistrationDto } from './dto/user-registration.dto';

import { MailgunService } from 'src/mailgun/mailgun.service';
import { AnyPtrRecord } from 'dns';
import e from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(QueueRegister)
    private queueUserRegisterRepository: Repository<QueueRegister>,
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    @InjectRepository(ReferenceLetter)
    private referenceLetterRepository: Repository<ReferenceLetter>,
    @InjectRepository(Church)
    private churchRepository: Repository<Church>,
    private mailgunService: MailgunService,
  ) {}

  async create(registerUserDto: UserRegistrationDto): Promise<any> {
    const { userInfo, referenceLetter } = registerUserDto;
    try {
      const emailCheck = await this.findByEmail(userInfo.email);
      if (emailCheck) return 'Email not valid!';

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userInfo.password, salt);

      let church: Church;
      if (userInfo.churchId.id === 'altro') {
        delete userInfo.churchId.id;
        church = new Church();
        church.name = userInfo.churchId.name;
        church.address = userInfo.churchId.address;
        church = await this.churchRepository.save(church);
      } else {
        church = new Church();
        church.id = userInfo.churchId.id as number;
        church.name = userInfo.churchId.name;
        church.address = userInfo.churchId.address;
      }

      const user: User = new User();
      user.number = userInfo.number;
      user.prefix = userInfo.prefix;
      user.email = userInfo.email;
      user.password = hashedPassword;
      user.username = userInfo.username;
      user.fkChurchId = church;

      const role = await this.roleRepository.findOne({ where: { id: 3 } });
      user.fkRoleId = role;
      const userSaved = await this.userRepository.save(user);

      const policy = await this.policyRepository.findOne({ where: { id: 1 } });

      const referenceLetterInput = new ReferenceLetter();
      referenceLetterInput.namePastorLeader = referenceLetter.namePastorLeader;
      referenceLetterInput.surnamePastorLeader =
        referenceLetter.surnamePastorLeader;
      referenceLetterInput.numberPastorLeader =
        referenceLetter.numberPastorLeader;
      referenceLetterInput.numberChurch = referenceLetter.numberChurch;
      referenceLetterInput.timeInChurch = referenceLetter.timeInChurch;
      referenceLetterInput.fkPolicyId = policy;

      if (referenceLetter.dateBaptism)
        referenceLetterInput.dateBaptism = referenceLetter.dateBaptism;

      if (referenceLetter.nameGuardian)
        referenceLetterInput.nameGuardian = referenceLetter.nameGuardian;

      if (referenceLetter.numberGuardian)
        referenceLetterInput.numberGuardian = referenceLetter.numberGuardian;

      if (referenceLetter.referenceDetails)
        referenceLetterInput.referenceDetails =
          referenceLetter.referenceDetails;
      const referenceLetterSaved =
        await this.referenceLetterRepository.save(referenceLetterInput);

      if (userSaved) {
        const createQueueUserRegistration = new QueueRegister();
        createQueueUserRegistration.fkUserId = userSaved;
        createQueueUserRegistration.verified = false;
        createQueueUserRegistration.fkReferenceLetterId = referenceLetterSaved;

        const queueUserRegisterSaved =
          await this.queueUserRegisterRepository.save(
            createQueueUserRegistration,
          );

        // TODO not understand why user cascade doesnt update fkQueueRegisterId directly, therefore i'm updating it manually
        if (queueUserRegisterSaved) {
          userSaved.fkQueueRegisterId = queueUserRegisterSaved;
          const userUpdateQueue = await this.userRepository.update(
            userSaved.id,
            userSaved,
          );

          referenceLetterSaved.fkQueueRegisterId = queueUserRegisterSaved;
          const referenceLetterUpdate =
            await this.referenceLetterRepository.update(
              referenceLetterSaved.id,
              referenceLetterSaved,
            );

          await this.mailgunService.sendEmail(userInfo.email);
          if (userUpdateQueue && referenceLetterUpdate)
            return { message: 'User created with success' };
        }
      }
    } catch (error) {
      console.error('Error occured:', error.message);
      return { message: 'Error while saving users' };
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    // I allow the user to update the password only trough forgot-password endpoint
    delete updateUserDto.password;

    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({
      where: { id },
      relations: { fkRoleId: true },
    });
  }

  async remove(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return `User deleted with success`;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: {
        fkRoleId: true,
      },
    });
  }

  async getChurchesFromViewAdminChurches(id: number): Promise<User | any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return { message: 'No user found' };
    const churchesAbleToSee = user.viewAdminChurches;
    const churches = [];
    if (churchesAbleToSee == 'ALL') {
      return await this.churchRepository.find();
    } else if (churchesAbleToSee) {
      const churchesIds = churchesAbleToSee.split(',');
      for (let i = 0; i < churchesIds.length; i++) {
        const idChurchNumber = parseInt(churchesIds[i]);
        const church = await this.churchRepository.findOne({
          where: { id: idChurchNumber },
        });
        if (church) churches.push(church);
      }
      return churches;
    } else {
      return { status: 404, message: 'No churches to show' };
    }
  }

  async getUsersByAdminViewerOnQueueRegister(
    id: string,
  ): Promise<User[] | any> {
    const userNotAuth = { message: 'User not autorized', status: 401 };
    const idUser = +id;
    const user = await this.userRepository.findOne({
      where: { id: idUser },
      relations: { fkRoleId: true, fkQueueRegisterId: true },
    });
    if (!user) return { message: 'User not found', status: 404 };
    if (user.fkRoleId.name == 'admin' || user.fkRoleId.name == 'super-admin') {
      if (user.fkQueueRegisterId.adminVerifier == AdminVerifier.SUPER_ADMIN) {
        const users = await this.userRepository.find({
          relations: {
            fkRoleId: true,
            fkQueueRegisterId: true,
          },
        });
        return users.map((user) => {
          const { password, createdAt, updatedAt, ...rest } = user;
          return rest;
        });
      } else {
        return userNotAuth;
      }
    } else {
      return userNotAuth;
    }
  }

  async updateAdminViewerChurchFromUser(
    id: string,
    idUser: string,
  ): Promise<User | any> {
    const userNotAuth = { message: 'User not authorized', status: 401 };
    const userId = +idUser;
    const churchId = +id;
    let updatedUser;

    const church = await this.churchRepository.findOne({
      where: { id: churchId },
    });
    if (!church) return { message: 'Church not found, status: 404' };

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { fkRoleId: true, fkQueueRegisterId: true },
    });
    if (!user) return { message: 'User not found', status: 404 };

    if (
      user.fkRoleId.name === 'admin' ||
      user.fkRoleId.name === 'super-admin'
    ) {
      if (id === 'ALL') {
        return {
          message: 'You cannot add if you have all churches with ALL tag',
          status: 403,
        };
      } else {
        if (
          user.viewAdminChurches &&
          user.viewAdminChurches.split(',').includes(id)
        ) {
          return { message: 'Church already in your group view', status: 403 };
        } else {
          if (user.viewAdminChurches) {
            user.viewAdminChurches +=
              (user.viewAdminChurches ? ',' : '') + church.id.toString();
          } else {
            user.viewAdminChurches = church.id.toString();
          }
          updatedUser = await this.userRepository.update(userId, user);
        }
      }
      const { password, createdAt, updatedAt, ...rest } = updatedUser;
      rest.status = 200;
      return rest;
    } else {
      return userNotAuth;
    }
  }

  async deleteAdminViewerChurchFromUser(
    id: string,
    idUser: string,
  ): Promise<User | any> {
    const userNotAuth = { message: 'User not authorized', status: 401 };
    const userId = +idUser;
    let updatedUser;

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { fkRoleId: true, fkQueueRegisterId: true },
    });

    if (!user) return { message: 'User not found', status: 404 };

    if (
      user.fkRoleId.name === 'admin' ||
      user.fkRoleId.name === 'super-admin'
    ) {
      if (id === 'ALL' || +id == 0) {
        user.viewAdminChurches = null;
        updatedUser = await this.userRepository.update(userId, user);
      } else {
        if (
          user.viewAdminChurches &&
          user.viewAdminChurches.split(',').includes(id)
        ) {
          user.viewAdminChurches = user.viewAdminChurches
            .split(',')
            .filter((item) => item !== id)
            .join(',');
          if (user.viewAdminChurches == '') user.viewAdminChurches = null;
        } else {
          return { message: 'Church ID not found', status: 404 };
        }

        updatedUser = await this.userRepository.update(userId, user);
      }
      const { password, createdAt, updatedAt, ...rest } = updatedUser;
      rest.status = 200;
      return rest;
    } else {
      return userNotAuth;
    }
  }
}

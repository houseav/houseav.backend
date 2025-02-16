import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { ForgotPassword } from './entities/forgot-password.entity';
import { User } from 'src/user/entities/user.entity';
import { ForgotPasswordResponse } from './response/ForgotPasswordResponse';
import { GeneratePassword } from '../../utils/functions';
import { MailgunService } from 'src/mailgun/mailgun.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(ForgotPassword)
    private readonly forgotPasswordRepository: Repository<ForgotPassword>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailgunService: MailgunService,
  ) {}

  async create(
    createForgotPasswordDto: CreateForgotPasswordDto,
  ): Promise<ForgotPasswordResponse> {
    const id = createForgotPasswordDto.fkUserId;
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return new ForgotPasswordResponse(
        'error',
        'User not found with this email',
      );
    }

    const forgotPassword = this.forgotPasswordRepository.create({
      token: createForgotPasswordDto.token,
      fkUserId: user,
    });

    const forgotPasswordResponse =
      await this.forgotPasswordRepository.save(forgotPassword);
    if (forgotPasswordResponse) {
      return new ForgotPasswordResponse(
        'success',
        'Forgot password created successfully',
      );
    } else {
      return new ForgotPasswordResponse(
        'error',
        'Error occurred, please try again',
      );
    }
  }

  async createByEmail(email: string): Promise<ForgotPasswordResponse> {
    const user = await this.userRepository.findOne({
      where: { email: ILike(email) },
    });

    if (!user) {
      return new ForgotPasswordResponse(
        'error',
        'User not found with this email',
      );
    }

    const temporaryPassword = GeneratePassword();
    const forgotPassword = this.forgotPasswordRepository.create({
      token: temporaryPassword,
      fkUserId: user,
    });

    const forgotPasswordResponse =
      await this.forgotPasswordRepository.save(forgotPassword);
    if (forgotPasswordResponse) {
      await this.mailgunService.sendForgotPasswordEmail(
        temporaryPassword,
        user.email,
        forgotPasswordResponse.timeCreation,
      );

      return new ForgotPasswordResponse(
        'success',
        'Forgot password created successfully',
        forgotPassword.timeCreation,
      );
    } else {
      return new ForgotPasswordResponse(
        'error',
        'Error occurred, please try again',
      );
    }
  }

  async resetPassword(
    query: any,
    password: string,
  ): Promise<ForgotPasswordResponse> {
    try {
      const checkRequestResponse = await this.checkRequest(query);
      if (checkRequestResponse.status === 'error') {
        return new ForgotPasswordResponse(
          'error',
          'Error occured, please contact support',
        );
      }

      const user = await this.userRepository.findOne({
        where: { email: query.email },
      });

      if (!user) {
        return new ForgotPasswordResponse('error', 'User not found');
      }

      const token = await this.forgotPasswordRepository.findOne({
        where: { token: query.token },
      });

      if (!token) {
        return new ForgotPasswordResponse('error', 'Data not found');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      await this.userRepository.update(user.id, user);
      return new ForgotPasswordResponse(
        'success',
        'User password updated with success!',
      );
    } catch (error) {
      console.error('Error while resetting password: ' + error);
      return new ForgotPasswordResponse('error', 'Data not found');
    }
  }

  async checkRequest(query: any): Promise<ForgotPasswordResponse> {
    const forgotPassword = await this.forgotPasswordRepository.findOne({
      where: { token: query.token },
      relations: ['fkUserId'],
    });

    if (!forgotPassword) {
      return new ForgotPasswordResponse('error', 'Data not found');
    }

    if (forgotPassword.fkUserId.email !== query.email) {
      return new ForgotPasswordResponse('error', 'Data not found');
    }
    const queryTimeCreation = query.timeCreation;
    const forgotPasswordTimeCreation =
      forgotPassword.timeCreation.toISOString();

    if (queryTimeCreation !== forgotPasswordTimeCreation) {
      return new ForgotPasswordResponse('error', 'Data not found');
    }

    if (this.checkIfPassedMoreThan5Minutes(forgotPassword.timeCreation)) {
      return new ForgotPasswordResponse('error', 'Session expired');
    }

    return new ForgotPasswordResponse('success', 'Data found with success');
  }

  async findAll(): Promise<ForgotPassword[]> {
    return this.forgotPasswordRepository.find({ relations: ['fkUserId'] });
  }

  async findOne(id: number): Promise<ForgotPassword> {
    const forgotPassword = await this.forgotPasswordRepository.findOne({
      where: { id },
    });

    if (!forgotPassword) {
      throw new NotFoundException(
        `Forgot password entry with ID ${id} not found`,
      );
    }

    return forgotPassword;
  }

  async remove(id: number): Promise<void> {
    const forgotPassword = await this.findOne(id);
    await this.forgotPasswordRepository.remove(forgotPassword);
  }

  checkIfPassedMoreThan5Minutes(timeCreation: Date): boolean {
    const FIVE_MINUTES_IN_MS = 5 * 60 * 1000; // 5 min in milliseconds

    const now = new Date();
    const timeDifference = now.getTime() - timeCreation.getTime();

    const isMoreThanFiveMinutes = timeDifference > FIVE_MINUTES_IN_MS;
    return isMoreThanFiveMinutes;
  }
}

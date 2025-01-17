import { Injectable } from '@nestjs/common';
import { CreateQueueUserRegistrationDto } from './dto/create-queue-user-registration.dto';
import { UpdateQueueUserRegistrationDto } from './dto/update-queue-user-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueRegister } from './entities/queue-register.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UpdateQueueUserRegistrationVerifyDto } from './dto/update-queue-user-registration-verify.dto';
import SecurityEnDe from '../../utils/security_en_de';
import { Role } from 'src/role/entities/role.entity';
import { MailgunService } from 'src/mailgun/mailgun.service';

interface TokenType {
  data: string;
}

@Injectable()
export class QueueUserRegistrationService {
  constructor(
    @InjectRepository(QueueRegister)
    private queueUserRegisterRepository: Repository<QueueRegister>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly mailgunService: MailgunService,
  ) {}

  async create(createQueueUserRegistrationDto: CreateQueueUserRegistrationDto) {
    const { fkUserId, verified } = createQueueUserRegistrationDto;
    const id: number = +fkUserId;
    const userId = await this.userRepository.findOne({ where: { id: id } });
    if (!userId) throw Error('Error while finding user!');
    const queueRegister = new QueueRegister();
    queueRegister.fkUserId = userId;
    queueRegister.verified = verified;
    await this.queueUserRegisterRepository.save(queueRegister);
  }

  async verify(body: UpdateQueueUserRegistrationVerifyDto) {
    const { token, user } = body as unknown as { token: TokenType; user: any };
    //decrypt token
    const sec = new SecurityEnDe();
    const result = await sec.decryptData(token.data);
    console.log(result);
    if (!result) throw 'Error while decrypting token';
    console.log(result);

    const queueRegisterNew = new QueueRegister();
    queueRegisterNew.verified = user.verified;
    queueRegisterNew.updatedAt = new Date();

    //update queue-register
    const updateQueueRegister = await this.queueUserRegisterRepository.update(
      user.idQueueUserRegistration,
      queueRegisterNew,
    );
    if (!updateQueueRegister) throw 'Error while updating queue-register';

    const role = await this.roleRepository.findOne({ where: { id: 2 } });

    //update user
    const userNew = new User();
    userNew.username = user.username;
    userNew.email = user.email;
    if (user?.password && user?.password != '' && user?.password.length > 6) {
      userNew.password = user.password;
    }
    userNew.social = user.social;
    userNew.number = user.number;
    userNew.avatar = user.avatar;
    userNew.createdAt = new Date(user.createdAt);
    userNew.createdAt.setHours(0, 0, 1);
    userNew.updatedAt = new Date();
    userNew.fkRoleId = role;
    // userNew.fkChurchId = user.fkChurchId;
    // userNew.fkQueueRegisterId = user.idQueueUserRegistration;

    const updateUser = await this.userRepository.update(
      Number(user.id),
      userNew,
    );
    if (!updateUser) throw 'Error while updating user';

    //TODO check mailgun service working
    await this.mailgunService.sendEmailUserVerified(user.email);
    return { message: 'Verify user queue registration' };
  }

  async findAll() {
    const users = await this.queueUserRegisterRepository.find({
      relations: { fkUserId: { fkRoleId: true, fkChurchId: true } },
    });
    if (!users) {
      throw 'Error occured queue-registration';
    }
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} queueUserRegistration`;
  }

  async update(
    idQueueUserRegistration: number,
    updateQueueUserRegistrationDto: UpdateQueueUserRegistrationDto,
  ) {
    const { fkUserId, verified } = updateQueueUserRegistrationDto;
    const id: number = +fkUserId;
    const userId = await this.userRepository.findOne({ where: { id: id } });
    if (!userId) throw Error('Error while finding user!');
    const queueRegister = new QueueRegister();
    queueRegister.fkUserId = userId;
    queueRegister.verified = verified;
    return this.queueUserRegisterRepository.update(
      idQueueUserRegistration,
      queueRegister,
    );
  }

  remove(id: number) {
    return this.queueUserRegisterRepository.delete(id);
  }

  async findQueueByChurchIdsAndVerifiedFalse(churchDto: any) {
    if (churchDto && Array.isArray(churchDto)) {
      const churchIds = churchDto.map((church) => church.id);
      const queueUsersRetrieved = await this.queueUserRegisterRepository.find({
        where: {
          id: In(churchIds),
          verified: false,
        },
        relations: {
          fkUserId: {
            fkRoleId: true,
            fkChurchId: true,
          },
          fkReferenceLetterId: true,
        },
      });
      if (queueUsersRetrieved.length > 0) {
        return queueUsersRetrieved;
      } else {
        return { status: 404, message: 'No records found!' };
      }
    } else {
      return { message: 'Churches not found' };
    }
  }

  async findAllVerifiedFalse() {
    const queueDataRetrieved = await this.queueUserRegisterRepository.find({
      where: {
        verified: false,
      },
      relations: { fkUserId: { fkRoleId: true, fkChurchId: true } },
    });
    const total = queueDataRetrieved.length.toString();

    const queueChurchesId = [
      ...new Set(queueDataRetrieved.map((user) => user.fkUserId.fkChurchId.id)),
    ];
    const queueUsersId = queueDataRetrieved.map((user) => user.id);

    const response = {
      totalQueueUserRetrieved: total,
      queueChurchesId: queueChurchesId,
      queueUsersId: queueUsersId,
    };

    return response;
  }
}

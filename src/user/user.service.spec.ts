import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MailgunService } from 'src/mailgun/mailgun.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { Church } from 'src/church/entities/church.entity';
import { QueueRegister } from 'src/queue-user-registration/entities/queue-register.entity';
import { Policy } from 'src/policy/entities/policy.entity';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { House } from 'src/house/entities/house.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserWithoutPasswordDto } from './dto/create-user.dto';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';

const UserRegistrationDto = {
  userInfo: {
    email: 'test@example.com',
    password: '12345',
    username: 'testuser',
    number: '1234567890',
    prefix: 'Mr.',
    churchId: {
      id: '1',
      name: 'Church',
      address: 'Church Address',
    },
  },
  referenceLetter: {
    id: 1,
    namePastorLeader: 'John',
    surnamePastorLeader: 'Doe',
    numberPastorLeader: '1234567890',
    timeInChurch: new Date(),
    acceptDecline: true,
    dateBaptism: new Date(),
    nameGuardian: 'John',
    numberGuardian: '1234567890',
    numberChurch: '1234567890',
    referenceDetails: 'Reference Details',
    fkPolicyId: { id: 1, labelPolicy: 'Policy', description: 'Policy' },
  },
};

const updateUserDto: CreateUserWithoutPasswordDto = {
  id: 1,
  username: 'updatedUser',
  email: 'updated@email.com',
  password: 'shouldBeIgnored',
  number: '123235435',
  avatar: 'http://example.com/avatar.jpg',
  roleId: '2',
  churchId: {
    id: 1,
    name: 'Sabaoth Church',
    address: 'Via Rosalba Carriera 11, Milano',
  },
  verified: true,
};

const updatedUser = {
  id: 1,
  password: 'shouldBeIgnored',
  username: 'updatedUser',
  email: 'updated@email.com',
  fkRoleId: { id: 2, name: 'user' },
};

describe('UserModule', () => {
  let mailgunService: MailgunService;
  let userService: UserService;

  // Mock repositories
  const mockUserRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
  };

  const mockRoleRepository = {
    findOne: jest.fn(),
  };

  const mockChurchRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockQueueRegisterRepository = {
    save: jest.fn(),
  };

  const mockQueueHouseRepository = {
    save: jest.fn(),
  };

  const mockPolicyRepository = {
    findOne: jest.fn(),
  };

  const mockReferenceLetterRepository = {
    save: jest.fn(),
    update: jest.fn(),
  };

  const mockHouseRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  // Mocking the MailgunService
  const mockMailgunService = {
    sendEmail: jest.fn().mockResolvedValue({ success: true }), // Example mock function
  };

  beforeEach(async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
        {
          provide: getRepositoryToken(Church),
          useValue: mockChurchRepository,
        },
        {
          provide: getRepositoryToken(QueueRegister),
          useValue: mockQueueRegisterRepository,
        },
        {
          provide: getRepositoryToken(QueueHouseRegistration),
          useValue: mockQueueHouseRepository,
        },
        {
          provide: getRepositoryToken(Policy),
          useValue: mockPolicyRepository,
        },
        {
          provide: getRepositoryToken(ReferenceLetter),
          useValue: mockReferenceLetterRepository,
        },
        {
          provide: getRepositoryToken(House),
          useValue: mockHouseRepository,
        },
        {
          provide: MailgunService,
          useValue: mockMailgunService,
        },
      ],
    }).compile();

    // Retrieve services from the compiled module
    userService = module.get<UserService>(UserService);
    mailgunService = module.get<MailgunService>(MailgunService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(mailgunService).toBeDefined();
  });

  /**
   *  Email already exists
   */
  it('should return "Email not valid!" if email already exists', async () => {
    // Arrange
    mockUserRepository.findOne.mockResolvedValueOnce({
      email: 'test@example.com',
    });

    // Act
    const result = await userService.create(UserRegistrationDto);

    // Assert
    expect(result).toEqual('Email not valid!');
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
      relations: { fkRoleId: true },
    });
  });

  /**
   *  Successfull user creation
   */
  it('should save a new user with hashed password and return success message', async () => {
    // Arrange
    mockUserRepository.findOne.mockResolvedValueOnce(null); // Email does not exist
    const mockRole = { id: 3, name: 'User' };
    mockRoleRepository.findOne.mockResolvedValueOnce(mockRole);
    const salt = 'randomSalt';
    const hashedPassword = 'hashedPassword123';
    jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(salt);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

    mockUserRepository.save.mockImplementation(async (userEntity) => {
      return { ...userEntity, id: 1 };
    });

    mockUserRepository.update.mockImplementation(async (userEntity) => {
      return { ...userEntity, id: 1 };
    });

    mockPolicyRepository.findOne.mockResolvedValueOnce({ id: 1 });
    mockReferenceLetterRepository.save.mockResolvedValueOnce({ id: 1 });
    mockReferenceLetterRepository.update.mockImplementation(
      async (referenceLetterEntity) => {
        return { ...referenceLetterEntity, id: 1 };
      },
    );
    mockQueueRegisterRepository.save.mockResolvedValueOnce({ id: 1 });

    // Act
    const result = await userService.create(UserRegistrationDto);
    if (result == undefined) {
      throw new Error('User not created');
    }
    // Assert
    expect(bcrypt.genSalt).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith('12345', salt);
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockMailgunService.sendEmail).toHaveBeenCalledWith(
      'test@example.com',
    );
    expect(result).toEqual({ message: 'User created with success' });
  });

  /**
   *  Church creation if churchId is "altro"
   */
  it('should save a new church if churchId is "altro"', async () => {
    // Arrange
    const customChurchDto = {
      ...UserRegistrationDto,
      userInfo: {
        ...UserRegistrationDto.userInfo,
        churchId: {
          id: 'altro',
          name: 'Custom Church',
          address: 'Custom Address',
        },
      },
    };
    mockUserRepository.findOne.mockResolvedValueOnce(null);
    mockChurchRepository.save.mockResolvedValueOnce({
      id: 2,
      name: 'Custom Church',
    });
    // Mock other required repository methods...

    // Act
    await userService.create(customChurchDto);

    // Assert
    expect(mockChurchRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Custom Church',
        address: 'Custom Address',
      }),
    );
  });

  /**
   *  Error handling
   */
  it('should return error message if any error occurs', async () => {
    // Arrange
    mockUserRepository.findOne.mockResolvedValueOnce(null);
    mockUserRepository.save.mockRejectedValueOnce(new Error('Database Error'));

    // Act
    const result = await userService.create(UserRegistrationDto);

    // Assert
    expect(result).toEqual({ message: 'Error while saving users' });
  });

  /**
   *  Find all users
   */
  it('should return an array of users', async () => {
    // Arrange
    const mockUsers = [{ id: 1, email: 'test@example.com' }];
    mockUserRepository.find.mockResolvedValueOnce(mockUsers);

    // Act
    const result = await userService.findAll();
    expect(result).toEqual(mockUsers);
  });

  /**
   *  Update user
   */
  it('should update a user and return the updated user', async () => {
    const userId = 1;
    mockUserRepository.update.mockResolvedValue({ affected: 1 });
    mockUserRepository.findOne.mockResolvedValue(updatedUser);
    const result = await userService.update(userId, updateUserDto);
    expect(mockUserRepository.update).toHaveBeenCalledWith(userId, {
      ...updateUserDto,
      password: undefined,
    });
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { id: userId },
      relations: { fkRoleId: true },
    });
    expect(result).toEqual(updatedUser);
  });

  it('should not update the password', async () => {
    const userId = 1;
    await userService.update(userId, updateUserDto);
    expect(mockUserRepository.update).toHaveBeenCalledWith(
      userId,
      updateUserDto,
    );
  });
});

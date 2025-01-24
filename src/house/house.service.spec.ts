import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { House } from './entities/house.entity';
import { User } from 'src/user/entities/user.entity';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';
import { MapGeometry } from 'src/map-geometry/entities/map-geometry.entity';
import {
  mockCreateHouseDto,
  mockHouse,
  mockQueueHouseRegistration,
  mockUser,
} from 'src/test/mock.entities/mock.entities';

import { UserService } from 'src/user/user.service';
import { HouseService } from './house.service';
import { MapGeometryService } from 'src/map-geometry/map-geometry.service';
import { QueueHouseRegistrationService } from 'src/queue-house-registration/queue-house-registration.service';

describe('HouseService', () => {
  let houseService: HouseService;
  let houseRepository: jest.Mocked<Repository<House>>;
  let userService: jest.Mocked<UserService>;
  let userRepository: jest.Mocked<Repository<User>>;
  let queueHouseRegistrationService: jest.Mocked<QueueHouseRegistrationService>;
  let queueHouseRegistrationRepository: jest.Mocked<
    Repository<QueueHouseRegistration>
  >;
  let mapGeometryService: jest.Mocked<MapGeometryService>;
  let mapGeometryRepository: jest.Mocked<Repository<MapGeometry>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: QueueHouseRegistrationService,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: MapGeometryService,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(House),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(QueueHouseRegistration),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(MapGeometry),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    houseService = module.get<HouseService>(HouseService);
    houseRepository = module.get<jest.Mocked<Repository<House>>>(
      getRepositoryToken(House),
    );
    userService = module.get(UserService);
    userRepository = module.get<jest.Mocked<Repository<User>>>(
      getRepositoryToken(User),
    );
    queueHouseRegistrationService = module.get(QueueHouseRegistrationService);
    mapGeometryService = module.get(MapGeometryService);
    mapGeometryRepository = module.get<jest.Mocked<Repository<MapGeometry>>>(
      getRepositoryToken(MapGeometry),
    );
    queueHouseRegistrationRepository = module.get<
      jest.Mocked<Repository<QueueHouseRegistration>>
    >(getRepositoryToken(QueueHouseRegistration));
  });

  describe('create', () => {
    it('should successfully house creation', async () => {
      jest
        .spyOn(houseService, 'checkUserGetHouse')
        .mockResolvedValue(mockHouse);
      houseRepository.save.mockResolvedValue(mockHouse);
      mapGeometryRepository.save.mockResolvedValue({
        id: 1,
        latitude: '41.8719',
        longitude: '12.5674',
        geometry: {},
      });

      queueHouseRegistrationRepository.save.mockResolvedValue(
        mockQueueHouseRegistration,
      );

      const result = await houseService.create(mockCreateHouseDto);
      expect(result).toEqual({ message: 'House added with success' });
      expect(houseService.checkUserGetHouse).toHaveBeenCalledWith(
        mockCreateHouseDto,
        true,
        null,
      );
      expect(mapGeometryRepository.save).toHaveBeenCalled();
      expect(queueHouseRegistrationRepository.save).toHaveBeenCalled();
    });

    it('should return error houseQueueSaved null', async () => {
      jest
        .spyOn(houseService, 'checkUserGetHouse')
        .mockResolvedValue(mockHouse);
      houseRepository.save.mockResolvedValue(mockHouse);
      mapGeometryRepository.save.mockResolvedValue({
        id: 1,
        latitude: '41.8719',
        longitude: '12.5674',
        geometry: {},
      });

      queueHouseRegistrationRepository.save.mockReturnValue(null);
      expect(await houseService.create(mockCreateHouseDto)).toEqual({
        message: 'Error while adding house',
      });
      expect(houseService.checkUserGetHouse).toHaveBeenCalledWith(
        mockCreateHouseDto,
        true,
        null,
      );
      expect(mapGeometryRepository.save).toHaveBeenCalled();
      expect(queueHouseRegistrationRepository.save).toHaveBeenCalled();
    });
  });

  describe('checkUserGetHouse', () => {
    it('User not found', async () => {
      userService.findOne.mockReturnValue(null);
      await expect(
        houseService.checkUserGetHouse(mockCreateHouseDto, false, null),
      ).rejects.toThrow(Error);
    });

    it('Error finding House', async () => {
      userRepository.findOne.mockResolvedValue(Promise.resolve(mockUser));
      houseRepository.findOne.mockResolvedValue(null);
      const mockCreationHouseDtoCopy = { ...mockCreateHouseDto };
      mockCreationHouseDtoCopy.queueHouseId = null;
      await expect(
        houseService.checkUserGetHouse(mockCreationHouseDtoCopy, false, 1),
      ).rejects.toThrow(Error);
      expect(userRepository.findOne).toHaveBeenCalled();
    });

    it('Queue house not found', async () => {
      userRepository.findOne.mockResolvedValue(Promise.resolve(mockUser));
      houseRepository.findOne.mockResolvedValue(null);
      queueHouseRegistrationRepository.findOne.mockResolvedValue(null);
      await expect(
        houseService.checkUserGetHouse(mockCreateHouseDto, false, 1),
      ).rejects.toThrow(Error);
      expect(userRepository.findOne).toHaveBeenCalled();
    });

    it('Queue house not found', async () => {
      userRepository.findOne.mockResolvedValue(Promise.resolve(mockUser));
      houseRepository.findOne.mockResolvedValue(null);
      queueHouseRegistrationRepository.findOne.mockResolvedValue(null);
      const result = await houseService.checkUserGetHouse(
        mockCreateHouseDto,
        true,
        1,
      );
      expect(result).toBeInstanceOf(House);
      expect(userRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('findOneWithPassword', () => {
    it('House not verified yet', async () => {
      const mockHouseCopy = { ...mockHouse };
      mockHouseCopy.fkQueueHouseRegistrationId = {
        verified: false,
        fkHouseId: mockHouse,
      };
      houseRepository.findOne.mockResolvedValue(mockHouseCopy);
      const result = await houseService.findOneWithPassword(1);
      expect(result).toEqual({
        verified: false,
        message: 'House not verified yet',
      });
    });
  });
});

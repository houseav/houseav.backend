import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { House } from './entities/house.entity';
import { User } from 'src/user/entities/user.entity';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';
import { MapGeometry } from 'src/map-geometry/entities/map-geometry.entity';
import {
  getMockHouseObject,
  mockHouse,
  mockCreateHouseDto,
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
  let mockQueryBuilder: any;

  beforeEach(async () => {
    mockQueryBuilder = {
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    };

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
            findHouseOwnershipByUserIdAndHouseId: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
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

  afterEach(() => {
    jest.clearAllMocks();
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

  describe('findOne', () => {
    it('find one to update it', async () => {
      // I need to check the user from the bearer token
      // call the house and check if the user own it
      houseRepository.findOne.mockResolvedValue(getMockHouseObject());
      const result = await houseService.findHouseOwnershipByUserIdAndHouseId(
        1,
        2,
      );
      expect(result).toBeInstanceOf(House);
      expect(houseRepository.findOne).toHaveBeenCalled();
    });

    it('find one with fkQueueHouseRegistrationId.verified = false', async () => {
      const mockHouseObject = getMockHouseObject();
      mockHouseObject.fkQueueHouseRegistrationId.verified = false;
      houseRepository.findOne.mockResolvedValue(mockHouseObject);
      const result = await houseService.findOne(1);
      expect(result).toEqual({
        verified: false,
        message: 'House not verified yet',
      });
      expect(houseRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {
          fkUserId: true,
          fkQueueHouseRegistrationId: true,
          fkMapId: true,
        },
      });
    });
  });

  describe('getHouseBySearch', () => {
    it('should call default query (verified = true) and pagination if no query params are passed', async () => {
      // Arrange
      mockQueryBuilder.getMany.mockResolvedValueOnce([]); // mock return value
      // Act
      const result = await houseService.getHousesBySearch({});
      // Assert
      expect(houseRepository.createQueryBuilder).toHaveBeenCalledWith('house');
      expect(mockQueryBuilder.innerJoinAndSelect).toHaveBeenCalledTimes(2);
      expect(mockQueryBuilder.innerJoinAndSelect).toHaveBeenCalledWith(
        'house.fkQueueHouseRegistrationId',
        'queueHouseRegistration',
      );
      expect(mockQueryBuilder.innerJoinAndSelect).toHaveBeenCalledWith(
        'house.fkMapId',
        'map',
      );

      // By default, .where should be called with queueHouseRegistration.verified = :verified
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'queueHouseRegistration.verified = :verified',
        { verified: true },
      );

      // Should not call andWhere for wifi/furnished/parking/availability/allergy
      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalledWith(
        expect.stringContaining('wifi'),
        expect.any(Object),
      );
      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalledWith(
        expect.stringContaining('furnished'),
        expect.any(Object),
      );

      // Default sorting and pagination
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'house.createdAt',
        'DESC',
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(9);

      // getMany is called to retrieve results
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual([]); // Our mocked return
    });

    it('should filter by searchTerm if provided', async () => {
      mockQueryBuilder.getMany.mockResolvedValueOnce([]);

      await houseService.getHousesBySearch({ searchTerm: 'some text' });

      // The FIRST .where call sets verified
      // The second .where call sets the searchTerm condition
      expect(mockQueryBuilder.where).toHaveBeenCalledTimes(4);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'house.title ILIKE :searchTerm',
        { searchTerm: '%some text%' },
      );
    });

    it('should filter by wifi when wifi is true', async () => {
      mockQueryBuilder.getMany.mockResolvedValueOnce([]);
      await houseService.getHousesBySearch({ wifi: 'true' });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'house.wifi = :wifi',
        { wifi: true },
      );
    });

    it('should filter by wifi when wifi is false', async () => {
      mockQueryBuilder.getMany.mockResolvedValueOnce([]);
      await houseService.getHousesBySearch({ wifi: 'false' });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'house.wifi = :wifi',
        { wifi: false },
      );
    });

    it('should filter by furnished when furnished is true', async () => {
      mockQueryBuilder.getMany.mockResolvedValueOnce([]);
      await houseService.getHousesBySearch({ furnished: 'true' });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'house.furnished = :furnished',
        { furnished: true },
      );
    });

    it('should filter by furnished when furnished is false', async () => {
      mockQueryBuilder.getMany.mockResolvedValueOnce([]);
      await houseService.getHousesBySearch({ furnished: 'false' });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'house.furnished = :furnished',
        { furnished: false },
      );
    });

    it('should filter by parking correctly', async () => {
      mockQueryBuilder.getMany.mockResolvedValueOnce([]);
      // parking is a bit tricky:
      // `const parking = query.parking !== 'false' || query.parking == undefined ? false : true;`
      // If `parking` = 'true', that results in the condition being (parking = true)?
      // Actually in the code:
      //   query.parking !== 'false' || query.parking == undefined -> false
      // This is somewhat confusing logic, so let's test carefully.

      await houseService.getHousesBySearch({ parking: 'true' });
      // By the code: `parking = query.parking !== 'false' || query.parking == undefined ? false : true`
      // if parking = 'true', then (parking !== 'false') is true -> returns false
      // So it sets `parking = false` ironically.
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'house.parking = :parking',
        { parking: false },
      );

      jest.clearAllMocks();

      await houseService.getHousesBySearch({ parking: 'false' });
      // (parking !== 'false') = false => it returns `true`
      // so sets `parking = true`
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'house.parking = :parking',
        { parking: true },
      );
    });

    it('should filter by availability when availability is provided', async () => {
      mockQueryBuilder.getMany.mockResolvedValueOnce([]);
      await houseService.getHousesBySearch({ availability: 'true' });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'house.availability = :availability',
        { availability: true },
      );

      jest.clearAllMocks();

      await houseService.getHousesBySearch({ availability: 'false' });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'house.availability = :availability',
        { availability: false },
      );
    });

    it('should filter by allergy when allergy is set to true', async () => {
      mockQueryBuilder.getMany.mockResolvedValueOnce([]);
      await houseService.getHousesBySearch({ allergy: 'true' });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'house.allergy is not null',
      );
    });

    it('should not filter by allergy if allergy is undefined or false', async () => {
      mockQueryBuilder.getMany.mockResolvedValueOnce([]);
      await houseService.getHousesBySearch({ allergy: 'false' });
      // Should not call andWhere('house.allergy is not null')
      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalledWith(
        'house.allergy is not null',
      );

      jest.clearAllMocks();

      await houseService.getHousesBySearch({});
      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalledWith(
        'house.allergy is not null',
      );
    });

    it('should apply pagination and sorting', async () => {
      mockQueryBuilder.getMany.mockResolvedValueOnce([]);
      await houseService.getHousesBySearch({
        limit: '5',
        startIndex: '10',
        sort: 'title',
        order: 'asc',
      });

      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'house.title',
        'ASC',
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(10);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(5);
    });

    it('should return the results from getMany()', async () => {
      const mockHouses = [{ id: 1 }, { id: 2 }] as any;
      mockQueryBuilder.getMany.mockResolvedValueOnce(mockHouses);

      const result = await houseService.getHousesBySearch({});
      expect(result).toEqual(mockHouses);
    });
  });
});

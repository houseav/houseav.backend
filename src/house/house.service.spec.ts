import { Test, TestingModule } from '@nestjs/testing';
import { House } from './entities/house.entity';
import { HouseService } from './house.service';
import { UserService } from 'src/user/user.service';
import { QueueHouseRegistrationService } from 'src/queue-house-registration/queue-house-registration.service';
import { MapGeometryService } from 'src/map-geometry/map-geometry.service';
import {
  mockCreateHouseDto,
  mockHouse,
  mockQueueHouseRegistration,
} from 'src/test/mock.entities/mock.entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MapGeometry } from 'src/map-geometry/entities/map-geometry.entity';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

describe('HouseService', () => {
  let houseService: HouseService;
  let houseRepository: jest.Mocked<Repository<House>>;
  let userService: jest.Mocked<UserService>;
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
    userService = module.get(UserService);
    queueHouseRegistrationService = module.get(QueueHouseRegistrationService);
    mapGeometryService = module.get(MapGeometryService);
    mapGeometryRepository = module.get<jest.Mocked<Repository<MapGeometry>>>(
      getRepositoryToken(MapGeometry),
    );
    queueHouseRegistrationRepository = module.get<
      jest.Mocked<Repository<QueueHouseRegistration>>
    >(getRepositoryToken(QueueHouseRegistration));
    houseRepository = module.get<jest.Mocked<Repository<House>>>(
      getRepositoryToken(House),
    );
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
  });
});

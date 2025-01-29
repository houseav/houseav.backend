import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as dotenv from 'dotenv';
import { AppModule } from 'src/app.module';
import { AuthGuard } from '@nestjs/passport';
import { HouseService } from 'src/house/house.service';
import * as jwt from 'jsonwebtoken';
import {
  mockCreateHouseDtoTyped,
  mockHouse,
} from 'src/test/mock.entities/mock.entities';

// Load env variables
dotenv.config();

const AUTH_SECRET_TKN = process.env.AUTH_SECRET;
const RESPONSE_VALID_STATUS_CODES = [200, 201];
const token = generateTestToken(AUTH_SECRET_TKN);

// Create a mock for HouseService
const mockHouseService = {
  create: jest.fn(),
  getHousesBySearch: jest.fn(),
  findAll: jest.fn(),
  findUserHouses: jest.fn(),
  findOne: jest.fn(),
  findHouseOwnershipByUserIdAndHouseId: jest.fn(),
  findOneByUser: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('HouseController (e2e)', () => {
  jest.setTimeout(30000);
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard('jwt')) // Mock the AuthGuard
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .overrideProvider(HouseService) // Override the HouseService with our mock
      .useValue(mockHouseService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    jest.clearAllMocks(); // Clear any mocks globally
    if (app) {
      await app.close(); // Close the application
    }
    if (moduleFixture) {
      await moduleFixture.close(); // Destroy the module
    }
  });

  describe('POST: /house', () => {
    beforeEach(() => {
      jest.spyOn(mockHouseService, 'create');
    });

    it('should return OK (create house)', async () => {
      const res = await request(app.getHttpServer())
        .post('/house')
        .send(mockCreateHouseDtoTyped)
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('GET: /house/get', () => {
    beforeEach(() => {
      jest.spyOn(mockHouseService, 'getHousesBySearch');
    });

    it('should return OK (get houses by search)', async () => {
      const res = await request(app.getHttpServer())
        .get('/house/get')
        .query({ wifi: true, searchTerm: 'cozy' }) // example query
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('GET: /house', () => {
    beforeEach(() => {
      jest.spyOn(mockHouseService, 'findAll');
    });

    it('should return OK (get all houses)', async () => {
      const res = await request(app.getHttpServer())
        .get('/house')
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('GET: /house/user', () => {
    beforeEach(() => {
      jest.spyOn(mockHouseService, 'findUserHouses');
    });

    it('should return OK (get houses for user)', async () => {
      const res = await request(app.getHttpServer())
        .get('/house/user')
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('GET: /house/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockHouseService, 'findOne');
    });

    it('should return OK (get one house by id)', async () => {
      const res = await request(app.getHttpServer())
        .get('/house/1')
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('GET: /house/ownership/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockHouseService, 'findHouseOwnershipByUserIdAndHouseId');
    });

    it('should return OK (house ownership)', async () => {
      const res = await request(app.getHttpServer())
        .get('/house/ownership/1')
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('GET: /house/user/:id/:idHouse', () => {
    beforeEach(() => {
      jest.spyOn(mockHouseService, 'findOneByUser');
    });

    it('should return OK (get house by user and house id)', async () => {
      const res = await request(app.getHttpServer())
        .get('/house/user/1/10')
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('PATCH: /house/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockHouseService, 'update');
    });

    it('should return OK (update house)', async () => {
      const res = await request(app.getHttpServer())
        .patch('/house/1')
        .send(mockHouse)
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('DELETE: /house/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockHouseService, 'remove');
    });

    it('should return OK (delete house)', async () => {
      const res = await request(app.getHttpServer())
        .delete('/house/1')
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });
});

export function generateTestToken(token: string): string {
  if (!token) {
    throw new Error('Token is not defined');
  }
  return jwt.sign({ userId: 1, username: 'testuser' }, token, {
    expiresIn: '1h',
  });
}

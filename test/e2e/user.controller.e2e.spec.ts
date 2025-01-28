import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as dotenv from 'dotenv';
dotenv.config();
import { UserService } from 'src/user/user.service';
import { AppModule } from 'src/app.module';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { mockUser } from 'src/test/mock.entities/mock.entities';

const AUTH_SECRET_TKN = process.env.AUTH_SECRET;
const RESPONSE_VALID_STATUS_CODES = [200, 201];
const token = generateTestToken(AUTH_SECRET_TKN);

const mockUserService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  remove: jest.fn(),
  patch: jest.fn(),
};

describe('UserController (e2e)', () => {
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
      .overrideProvider(UserService)
      .useValue(mockUserService)
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

  describe('GET: user/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockUserService, 'findOne');
    });

    it('should return OK', async () => {
      const res = await request(app.getHttpServer())
        .get('/user/1')
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('GET: user/all', () => {
    beforeEach(() => {
      jest.spyOn(mockUserService, 'findAll');
    });

    it('should return OK', async () => {
      const res = await request(app.getHttpServer())
        .get('/user/all')
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('POST: user', () => {
    beforeEach(() => {
      jest.spyOn(mockUserService, 'create');
    });

    it('should return OK', async () => {
      const res = await request(app.getHttpServer())
        .post('/user')
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('PATCH: user/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockUserService, 'update');
    });

    it('should return OK', async () => {
      const res = await request(app.getHttpServer())
        .patch('/user/1')
        .send(mockUser)
        .set('Authorization', `Bearer ${token}`);
      expect(RESPONSE_VALID_STATUS_CODES).toContain(res.status);
    });
  });

  describe('DELETE: user/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockUserService, 'delete');
    });

    it('should return OK', async () => {
      const res = await request(app.getHttpServer())
        .delete('/user/1')
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

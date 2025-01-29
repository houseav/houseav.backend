import { User } from 'src/user/entities/user.entity';
import { Policy } from 'src/policy/entities/policy.entity';
import { QueueRegister } from 'src/queue-user-registration/entities/queue-register.entity';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { Role } from 'src/role/entities/role.entity';
import { HistorySession } from 'src/history-sessions/entities/history-session.entity';
import { House } from 'src/house/entities/house.entity';
import { MapGeometry } from 'src/map-geometry/entities/map-geometry.entity';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';
import { Church } from 'src/church/entities/church.entity';
import { ADMIN_DASHBOARD_VERIFIER } from '../../../utils/constants';
import { CreateHouseDto } from 'src/house/dto/create-house.dto';

// Mock Role
const mockRole: Role = {
  id: 1,
  name: 'super-admin',
  description: 'Super Admin, to manage admin users',
  fkUserId: [], // This will be set later
};

// Mock Policy
const mockPolicy: Policy = {
  id: 1,
  labelPolicy: 'Policy 1',
  description: 'NDA, Accept Law X Y Z',
  datePolicy: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock ReferenceLetter
const mockReferenceLetter: ReferenceLetter = {
  id: 1,
  namePastorLeader: 'Mario',
  surnamePastorLeader: 'Rossi',
  numberPastorLeader: '3518279292',
  timeInChurch: new Date(new Date().setDate(new Date().getDate() - 10)),
  dateBaptism: new Date(new Date().setDate(new Date().getDate() - 5)),
  nameGuardian: null,
  numberGuardian: null,
  numberChurch: '900600230',
  referenceDetails: 'Dettagli non presenti',
  acceptDecline: true,
  fkQueueRegisterId: null, // This will be set later
  fkPolicyId: mockPolicy,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock QueueRegister
const mockQueueRegister: QueueRegister = {
  id: 1,
  verified: true,
  adminVerifier: ADMIN_DASHBOARD_VERIFIER.SUPER_ADMIN,
  fkUserId: null, // This will be set later
  fkReferenceLetterId: mockReferenceLetter,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock HistorySession
const access_token_expiresAt = new Date();
access_token_expiresAt.setDate(access_token_expiresAt.getDate() + 1);
const refresh_token_expiresAt = new Date();
refresh_token_expiresAt.setDate(refresh_token_expiresAt.getDate() + 1);

const mockHistorySessionLogin: HistorySession = {
  id: 1,
  access_token: 'fake_access_tkn_JKBJHSB(*@#&@()#',
  refresh_token: 'fake_refresh_tkn_JKBJHSB(*@#&@()#',
  access_token_expiresAt: access_token_expiresAt,
  refresh_token_expiresAt: refresh_token_expiresAt,
  active: true,
  ipAddress: '192.169.1.100',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit',
  invalidateBy: null,
  invalidateReason: null,
  expiresAt: access_token_expiresAt,
  createdAt: new Date(),
  updatedAt: new Date(),
  fkUserId: null, // This will be set later
};

const mockChurch: Church = {
  id: 1,
  name: 'Test Church',
  address: '123 Church St',
  fkUserId: [],
};

// Mock House
const mockHouse: House = {
  id: 1,
  title: 'House Title',
  description: 'House Description',
  zipcode: 12345,
  address: 'House Address',
  streetNumber: 10,
  city: 'City',
  state: 'State',
  bathrooms: 2,
  bedrooms: 3,
  furnished: true,
  parking: true,
  type: 'villa',
  wifi: true,
  imageUrls: 'https://example.com/image.jpg',
  availability: true,
  availabilityDateStart: new Date(),
  availabilityDateEnd: new Date(new Date().setDate(new Date().getDate() + 30)),
  sleepPlace: 4,
  allergy: 'None',
  animali: 'None',
  requestRoommateType: 'coppie',
  transportation: 'auto',
  zone: 'zona',
  createdAt: new Date(),
  updatedAt: new Date(),
  fkUserId: null, // This will be set later
  fkMapId: null, // This will be set later
  fkQueueHouseRegistrationId: null, // This will be set later
};

const mockCreateHouseDtoTyped: CreateHouseDto = {
  title: 'Beautiful House',
  description: 'A lovely house with a stunning garden.',
  address: '123 Main St',
  zipcode: '12345',
  streetNumber: '10',
  city: 'Milan',
  state: 'Lombardy',
  bathrooms: 2,
  bedrooms: 3,
  furnished: true,
  parking: true,
  type: 'Villa',
  wifi: true,
  imageUrls: 'https://example.com/images/house.jpg',
  availability: true,
  availabilityDateStart: new Date('2025-01-01'),
  availabilityDateEnd: new Date('2025-12-31'),
  sleepPlace: 4,
  allergy: 'None',
  animals: 'Pets Allowed',
  requestRoommateType: 'Couples; Families; Children',
  transportation: 'Car; Public Transport',
  zone: 'Downtown',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 1, // or a User object
  queueHouseId: 1, // or a QueueHouseRegistration object
  verified: false,
  longitude: '9.112047290691110',
  latitude: '45.49220310174620',
};

// Mock User
const mockUserForHouseEntity: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  password: 'password',
  validatePassword: jest.fn().mockResolvedValue(true) as jest.Mock, // Mock validatePassword method
  fkRoleId: mockRole,
  fkChurchId: mockChurch,
  fkQueueRegisterId: mockQueueRegister,
  fkHistorySessions: [],
};

// Mock House Object
const getMockHouseObject = (): House => {
  const mockHouseObject: House = new House();
  mockHouseObject.id = 1;
  mockHouseObject.title = 'Test House';
  mockHouseObject.description = 'Test Description';
  mockHouseObject.address = 'Test Address';
  mockHouseObject.zipcode = 12345;
  mockHouseObject.streetNumber = 10;
  mockHouseObject.city = 'Test City';
  mockHouseObject.state = 'Test State';
  mockHouseObject.bathrooms = 2;
  mockHouseObject.bedrooms = 3;
  mockHouseObject.furnished = true;
  mockHouseObject.parking = true;
  mockHouseObject.type = 'villa';
  mockHouseObject.wifi = true;
  mockHouseObject.imageUrls = 'https://example.com/image.jpg';
  mockHouseObject.availability = true;
  mockHouseObject.availabilityDateStart = new Date();
  mockHouseObject.availabilityDateEnd = new Date(
    new Date().setDate(new Date().getDate() + 30),
  );
  mockHouseObject.sleepPlace = 4;
  mockHouseObject.allergy = 'None';
  mockHouseObject.animali = 'None';
  mockHouseObject.requestRoommateType = 'coppie';
  mockHouseObject.transportation = 'auto';
  mockHouseObject.zone = 'zona';
  mockHouseObject.createdAt = new Date();
  mockHouseObject.updatedAt = new Date();
  mockHouseObject.fkUserId = mockUserForHouseEntity;
  mockHouseObject.fkQueueHouseRegistrationId = new QueueHouseRegistration();
  mockHouseObject.fkMapId = new MapGeometry();
  return mockHouseObject;
};

// Mock House Creation Dto
const mockCreateHouseDto = {
  title: 'Test House',
  description: 'Test Description',
  address: 'Test Address',
  zipcode: '12345',
  streetNumber: '10',
  city: 'Test City',
  state: 'Test State',
  bathrooms: 2,
  bedrooms: 3,
  furnished: true,
  parking: true,
  type: 'villa',
  wifi: true,
  imageUrls: 'https://example.com/image.jpg',
  availability: true,
  availabilityDateStart: new Date(),
  availabilityDateEnd: new Date(new Date().setDate(new Date().getDate() + 30)),
  sleepPlace: 4,
  allergy: 'None',
  animals: 'false',
  queueHouseId: 1,
  requestRoommateType: 'coppie',
  transportation: 'auto',
  zone: 'zona',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 1,
};

// Mock QueueHouseRegistration
const mockQueueHouseRegistration = {
  id: 1,
  verified: true,
  fkHouseId: mockHouse,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock MapGeometry
const mockMapGeometry: MapGeometry = {
  id: 1,
  latitude: '45.4642',
  longitude: '9.1900',
  fkHouseId: null, // This will be set later
  geometry: {
    type: 'Point',
    coordinates: [9.19, 45.4642],
  },
  created_at: new Date(),
  updated_at: new Date(),
};

// Mock User
const mockUser: User = {
  id: 1,
  email: 'example@gmail.com',
  avatar: 'default',
  username: 'admin',
  prefix: '+39',
  number: '3518279265',
  social: null,
  password: '$2b$10$tOauGFgHa6jJ7G3/NAu1..50XXvpjsrgGg9Nj6eDbmHPrOb9pesi',
  fkRoleId: mockRole,
  fkChurchId: {
    id: 2,
    name: 'Second Church',
    address: 'Second Church Address',
  },
  fkHouseId: [mockHouse],
  fkForgotPassword: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  fkQueueRegisterId: mockQueueRegister,
  viewAdminChurches: null,
  fkHistorySessions: [mockHistorySessionLogin],
  validatePassword: jest.fn().mockResolvedValue(true) as jest.Mock, // Mock validatePassword method
};

// Set the bidirectional relationships
mockReferenceLetter.fkQueueRegisterId = mockQueueRegister;
mockHistorySessionLogin.fkUserId = mockUser;
mockQueueRegister.fkUserId = mockUser;
mockHouse.fkUserId = mockUser;
mockHouse.fkMapId = mockMapGeometry;
mockMapGeometry.fkHouseId = mockHouse;
mockUser.fkHouseId = [];
mockUser.fkHistorySessions = [];
delete mockUser.fkQueueRegisterId;

export {
  mockUser,
  mockRole,
  mockPolicy,
  mockQueueRegister,
  mockReferenceLetter,
  mockHistorySessionLogin,
  mockCreateHouseDto,
  mockCreateHouseDtoTyped,
  mockHouse,
  getMockHouseObject,
  mockQueueHouseRegistration,
  mockMapGeometry,
};

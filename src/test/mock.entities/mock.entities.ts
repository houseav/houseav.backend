import { User } from 'src/user/entities/user.entity';
import { Policy } from 'src/policy/entities/policy.entity';
import {
  AdminVerifier,
  QueueRegister,
} from 'src/queue-user-registration/entities/queue-register.entity';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { Role } from 'src/role/entities/role.entity';
import { HistorySession } from 'src/history-sessions/entities/history-session.entity';
import { House } from 'src/house/entities/house.entity';
import { MapGeometry } from 'src/map-geometry/entities/map-geometry.entity';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';

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
  adminVerifier: AdminVerifier.SUPER_ADMIN,
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
  email: 'lucaimbalzano@gmail.com',
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
  mockHouse,
  mockMapGeometry,
};

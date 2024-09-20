import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from './dto/role.dto';

describe('RoleService', () => {
  let service: RoleService;
  let repository: Repository<Role>;

  const mockRoleRepositoryFunctions = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    // it mimics the real module of the Role
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role), // By using Inject Repository Token we identify the repository
          useValue: mockRoleRepositoryFunctions, // Mock the repository
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    // check if the service is instantiated correctly
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const roleArray = [{ id: 1, name: 'Admin', description: 'Admin role' }];
      mockRoleRepositoryFunctions.find.mockResolvedValue(roleArray);

      const result = await service.findAll();
      expect(result).toEqual(roleArray);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single role by id', async () => {
      const role = { id: 1, name: 'Admin', description: 'Admin role' };
      mockRoleRepositoryFunctions.findOne.mockResolvedValue(role);

      const result = await service.findOne(1);
      expect(result).toEqual(role);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('createRole', () => {
    it('should create a new role', async () => {
      const createRoleDto: RoleDto = { name: 'User', description: 'User role' };
      const role = { id: 1, ...createRoleDto };
      mockRoleRepositoryFunctions.save.mockResolvedValue(role);

      const result = await service.createRole(createRoleDto);
      expect(result).toEqual(role);
      expect(repository.save).toHaveBeenCalledWith(createRoleDto);
    });
  });

  describe('update', () => {
    it('should update a role and return a success message', async () => {
      const updateRoleDto: RoleDto = {
        name: 'Updated Role',
        description: 'Updated description',
      };
      mockRoleRepositoryFunctions.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, updateRoleDto);
      expect(result).toEqual('Role Update with success');
      expect(repository.update).toHaveBeenCalledWith(1, updateRoleDto);
    });
  });

  describe('delete', () => {
    it('should delete a role and return a success message', async () => {
      mockRoleRepositoryFunctions.delete.mockResolvedValue({ affected: 1 });

      const result = await service.delete(1);
      expect(result).toEqual('Role Deleted with success');
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOne(id: number): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  createRole(createRoleDto: RoleDto): Promise<Role> {
    const { name, description } = createRoleDto;
    const role: Role = {
      name,
      description,
    };
    return this.roleRepository.save(role);
  }

  async update(id: number, updateRoleDto: RoleDto): Promise<string> {
    await this.roleRepository.update(id, updateRoleDto);
    return 'Role Update with success';
  }

  async delete(id: number): Promise<string> {
    this.roleRepository.delete(id);
    return 'Role Deleted with success';
  }
}

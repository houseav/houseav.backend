import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './singleRole.module';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(+id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createRoleDto: RoleDto): Promise<Role> {
    return this.roleService.createRole(createRoleDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Body() updateRoleDto: RoleDto, @Param('id') id: string) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string): Promise<string> {
    return this.roleService.delete(+id);
  }
}

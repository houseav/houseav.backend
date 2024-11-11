import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { UserRegistrationDto } from './dto/user-registration.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: UserRegistrationDto })
  create(@Body() createUserDto: UserRegistrationDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/admin-view-churches/:id')
  async getViewAdminChurches(@Param('id') id: string) {
    return await this.userService.getChurchesFromViewAdminChurches(+id);
  }

  @Get('/get-users-admin-viewers/:id')
  getUsersByAdminViewerOnQueueRegister(@Param('id') id: string) {
    return this.userService.getUsersByAdminViewerOnQueueRegister(id);
  }

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch('admin-viewer-from-user/:id/:idUser')
  updateAdminViewerChurchFromUser(@Param('id') id: string, @Param('idUser') idUser: string) {
    return this.userService.updateAdminViewerChurchFromUser(+id, idUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Delete('admin-viewer-from-user/:id/:idUser')
  deleteAdminViewerChurchFromUser(@Param('id') id: string, @Param('idUser') idUser: string) {
    return this.userService.deleteAdminViewerChurchFromUser(id, idUser);
  } 
}

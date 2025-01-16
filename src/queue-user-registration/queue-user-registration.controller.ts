import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QueueUserRegistrationService } from './queue-user-registration.service';
import { CreateQueueUserRegistrationDto } from './dto/create-queue-user-registration.dto';
import { UpdateQueueUserRegistrationDto } from './dto/update-queue-user-registration.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateQueueUserRegistrationVerifyDto } from './dto/update-queue-user-registration-verify.dto';
import { CreateChurchDto } from 'src/church/dto/create-church.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin', 'super-admin')
@ApiTags('queue-user-registration')
@Controller('queue-user-registration')
export class QueueUserRegistrationController {
  constructor(
    private readonly queueUserRegistrationService: QueueUserRegistrationService,
  ) {}

  @Post()
  async create(
    @Body() createQueueUserRegistrationDto: CreateQueueUserRegistrationDto,
  ) {
    return await this.queueUserRegistrationService.create(
      createQueueUserRegistrationDto,
    );
  }

  @Post('/view-admin-church')
  async findByChurchIds(@Body() churchDto: CreateChurchDto[]): Promise<any> {
    return await this.queueUserRegistrationService.findQueueByChurchIdsAndVerifiedFalse(
      churchDto,
    );
  }

  @Get('all-verified-false')
  async findAllVerifiedFalse() {
    return await this.queueUserRegistrationService.findAllVerifiedFalse();
  }

  @Get()
  async findAll() {
    return await this.queueUserRegistrationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queueUserRegistrationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQueueUserRegistrationDto: UpdateQueueUserRegistrationDto,
  ) {
    return this.queueUserRegistrationService.update(
      +id,
      updateQueueUserRegistrationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queueUserRegistrationService.remove(+id);
  }

  @Post('/verify')
  verify(@Body() body: UpdateQueueUserRegistrationVerifyDto) {
    return this.queueUserRegistrationService.verify(body);
  }
}

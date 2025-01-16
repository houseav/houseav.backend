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
import { QueueHouseRegistrationService } from './queue-house-registration.service';
import { CreateQueueHouseRegistrationDto } from './dto/create-queue-house-registration.dto';
import { UpdateQueueHouseRegistrationDto } from './dto/update-queue-house-registration.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin', 'super-admin')
@ApiTags('queue-house-registration')
@Controller('queue-house-registration')
export class QueueHouseRegistrationController {
  constructor(
    private readonly queueHouseRegistrationService: QueueHouseRegistrationService,
  ) {}

  @Post('/verify')
  verify(
    @Body() createQueueHouseRegistrationDto: UpdateQueueHouseRegistrationDto,
  ) {
    return this.queueHouseRegistrationService.verify(
      createQueueHouseRegistrationDto,
    );
  }

  @Post()
  create(
    @Body() createQueueHouseRegistrationDto: CreateQueueHouseRegistrationDto,
  ) {
    return this.queueHouseRegistrationService.create(
      createQueueHouseRegistrationDto,
    );
  }

  @Get()
  findAll() {
    return this.queueHouseRegistrationService.findAll();
  }

  @Get('/verified-false')
  findAllVerifiedFalse() {
    return this.queueHouseRegistrationService.findAllVerifiedFalse();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queueHouseRegistrationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQueueHouseRegistrationDto: UpdateQueueHouseRegistrationDto,
  ) {
    return this.queueHouseRegistrationService.update(
      +id,
      updateQueueHouseRegistrationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queueHouseRegistrationService.remove(+id);
  }
}

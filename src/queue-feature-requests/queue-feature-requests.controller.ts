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
import { QueueFeatureRequestsService } from './queue-feature-requests.service';
import { CreateQueueFeatureRequestDto } from './dto/create-queue-feature-request.dto';
import { UpdateQueueFeatureRequestDto } from './dto/update-queue-feature-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('queue-feature-requests')
export class QueueFeatureRequestsController {
  constructor(
    private readonly queueFeatureRequestsService: QueueFeatureRequestsService,
  ) {}

  @Post()
  create(@Body() createQueueFeatureRequestDto: CreateQueueFeatureRequestDto) {
    return this.queueFeatureRequestsService.create(
      createQueueFeatureRequestDto,
    );
  }

  @Get()
  findAll() {
    return this.queueFeatureRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queueFeatureRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQueueFeatureRequestDto: UpdateQueueFeatureRequestDto,
  ) {
    return this.queueFeatureRequestsService.update(
      +id,
      updateQueueFeatureRequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queueFeatureRequestsService.remove(+id);
  }
}

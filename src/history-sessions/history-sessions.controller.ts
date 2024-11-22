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
import { HistorySessionsService } from './history-sessions.service';
import { CreateHistorySessionDto } from './dto/create-history-session.dto';
import { UpdateHistorySessionDto } from './dto/update-history-session.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('history-sessions')
export class HistorySessionsController {
  constructor(
    private readonly historySessionsService: HistorySessionsService,
  ) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createHistorySessionDto: CreateHistorySessionDto) {
    return this.historySessionsService.create(createHistorySessionDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.historySessionsService.findAll();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historySessionsService.findOne(+id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistorySessionDto: UpdateHistorySessionDto,
  ) {
    return this.historySessionsService.update(+id, updateHistorySessionDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historySessionsService.remove(+id);
  }
}

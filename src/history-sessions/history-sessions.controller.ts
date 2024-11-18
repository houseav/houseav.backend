import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorySessionsService } from './history-sessions.service';
import { CreateHistorySessionDto } from './dto/create-history-session.dto';
import { UpdateHistorySessionDto } from './dto/update-history-session.dto';

@Controller('history-sessions')
export class HistorySessionsController {
  constructor(private readonly historySessionsService: HistorySessionsService) {}

  @Post()
  create(@Body() createHistorySessionDto: CreateHistorySessionDto) {
    return this.historySessionsService.create(createHistorySessionDto);
  }

  @Get()
  findAll() {
    return this.historySessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historySessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorySessionDto: UpdateHistorySessionDto) {
    return this.historySessionsService.update(+id, updateHistorySessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historySessionsService.remove(+id);
  }
}

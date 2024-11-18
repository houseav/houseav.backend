import { Injectable } from '@nestjs/common';
import { CreateHistorySessionDto } from './dto/create-history-session.dto';
import { UpdateHistorySessionDto } from './dto/update-history-session.dto';

@Injectable()
export class HistorySessionsService {
  create(createHistorySessionDto: CreateHistorySessionDto) {
    return 'This action adds a new historySession';
  }

  findAll() {
    return `This action returns all historySessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historySession`;
  }

  update(id: number, updateHistorySessionDto: UpdateHistorySessionDto) {
    return `This action updates a #${id} historySession`;
  }

  remove(id: number) {
    return `This action removes a #${id} historySession`;
  }
}

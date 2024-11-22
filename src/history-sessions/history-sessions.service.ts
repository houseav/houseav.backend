import { Injectable } from '@nestjs/common';
import { CreateHistorySessionDto } from './dto/create-history-session.dto';
import { UpdateHistorySessionDto } from './dto/update-history-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorySession } from './entities/history-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistorySessionsService {
  constructor(
    @InjectRepository(HistorySession)
    private historySession: Repository<HistorySession>
  ){}

  create(createHistorySessionDto: CreateHistorySessionDto) {
    return 'This action adds a new historySession';
  }

  async findAll() {
    return await this.historySession.find();
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

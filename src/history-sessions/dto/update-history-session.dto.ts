import { PartialType } from '@nestjs/swagger';
import { CreateHistorySessionDto } from './create-history-session.dto';

export class UpdateHistorySessionDto extends PartialType(CreateHistorySessionDto) {}

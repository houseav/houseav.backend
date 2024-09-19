import { PartialType } from '@nestjs/swagger';
import { CreateReferenceLetterDto } from './create-reference-letter.dto';

export class UpdateReferenceLetterDto extends PartialType(CreateReferenceLetterDto) {}

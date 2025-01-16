import { PartialType } from '@nestjs/swagger';
import { BaseUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(BaseUserDto) {}

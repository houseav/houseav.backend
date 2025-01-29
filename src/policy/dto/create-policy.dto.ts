import { IsOptional, IsString, IsDate } from 'class-validator';

export class CreatePolicyDto {
  @IsOptional()
  @IsString()
  labelPolicy?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  datePolicy?: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReferenceLetterDto {
  @ApiProperty({ example: `username-pastor` })
  @IsString()
  namePastorLeader: string;

  @ApiProperty({ example: `surname-pastor` })
  @IsString()
  surnamePastorLeader: string;

  @ApiProperty({ example: `+393518279265` })
  @IsString()
  numberPastorLeader: string;

  @ApiProperty({ example: `2020-03-04` })
  timeInChurch: Date;

  @ApiProperty({ example: `2020-09-04` })
  dateBaptism: Date;

  @ApiProperty({ example: `name-guardian` })
  @IsString()
  nameGuardian?: string;

  @ApiProperty({ example: `numberGuardian` })
  @IsString()
  numberGuardian?: string;

  @ApiProperty({ example: `+39324626346` })
  @IsString()
  numberChurch?: string;

  @ApiProperty({ example: `reference details` })
  @IsString()
  referenceDetails?: string;
}

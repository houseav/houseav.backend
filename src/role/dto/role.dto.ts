import { IsNotEmpty } from '@nestjs/class-validator';

export class RoleDto {
  @IsNotEmpty({ message: 'Name must be validated', always: true })
  name: string;

  @IsNotEmpty({ message: 'Description must be validated', always: true })
  description: string;
}

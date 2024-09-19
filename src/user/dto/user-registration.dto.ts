import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Church } from 'src/church/entities/church.entity';
import { SignUpDto } from './sign-up.dto';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';

export class UserRegistrationDto {
  @ApiProperty({
    example: ` {
            "username": "user1",
            "email": "user1@user1.it",
            "number": "23423423",
            "password": "password",
            "password-confirm": "password",
            "churchId": {
                "id": 5,
                "name": "Adi Reggio Emilia",
                "address": "Via Bligny, 7, 42124 Reggio nell'Emilia RE"
            }
        }`,
  })
  userInfo: SignUpDto;

  @ApiProperty({
    example: `{
        "namePastorLeader": "name-pastor",
        "surnamePastorLeader": "surname-pastor",
        "numberPastorLeader": "346346326",
        "timeInChurch": "2024-07-10",
        "dateBaptism": "2024-07-10",
        "nameGuardian": "name-guardian",
        "numberGuardian": "334634",
        "numberChurch": "345345",
        "referenceDetails": "reference details"
    }`,
  })
  referenceLetter: ReferenceLetter;
}

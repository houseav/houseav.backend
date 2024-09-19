import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { Policy } from './entities/policy.entity';
import { ReferenceLetterController } from 'src/reference-letter/reference-letter.controller';
import { ReferenceLetterService } from 'src/reference-letter/reference-letter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReferenceLetter, Policy]),
    Policy,
    ReferenceLetter,
  ],
  controllers: [PolicyController, ReferenceLetterController],
  providers: [PolicyService, ReferenceLetterService],
})
export class PolicyModule {}

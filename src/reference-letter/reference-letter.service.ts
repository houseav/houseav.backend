import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReferenceLetterDto } from './dto/create-reference-letter.dto';
import { UpdateReferenceLetterDto } from './dto/update-reference-letter.dto';
import { ReferenceLetter } from './entities/reference-letter.entity';

@Injectable()
export class ReferenceLetterService {
  constructor(
    @InjectRepository(ReferenceLetter)
    private referenceLetterRepository: Repository<ReferenceLetter>,
  ) {}

  create(createReferenceLetterDto: CreateReferenceLetterDto) {
    const referenceLetter = this.referenceLetterRepository.create(
      createReferenceLetterDto,
    );
    return this.referenceLetterRepository.save(referenceLetter);
  }

  findAll() {
    return this.referenceLetterRepository.find();
  }

  findOne(id: number) {
    return this.referenceLetterRepository.findOne({ where: { id } });
  }

  update(id: number, updateReferenceLetterDto: UpdateReferenceLetterDto) {
    return this.referenceLetterRepository.update(id, updateReferenceLetterDto);
  }

  remove(id: number) {
    return this.referenceLetterRepository.delete(id);
  }
}

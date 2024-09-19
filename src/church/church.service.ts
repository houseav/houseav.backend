import { Injectable } from '@nestjs/common';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Church } from './entities/church.entity';

@Injectable()
export class ChurchService {
  constructor(
    @InjectRepository(Church)
    private churchRepository: Repository<Church>,
  ) {}

  async create(createChurchDto: CreateChurchDto): Promise<string> {
    const { name, address } = createChurchDto;
    const church: Church = { name, address };
    try {
      await this.churchRepository.save(church);
      return 'Church added with success';
    } catch (e) {
      return 'Error while creating new church: ' + e;
    }
  }

  findAll(): Promise<Church[]> {
    return this.churchRepository.find();
  }

  findOne(id: number): Promise<Church> {
    return this.churchRepository.findOne({ where: { id } });
  }

  async update(id: number, updateChurchDto: UpdateChurchDto): Promise<string> {
    // Destructure updateChurchDto to exclude the id field
    const { id: _, ...updateData } = updateChurchDto;
    await this.churchRepository.update(id, updateData as Partial<Church>);
    return 'Update church with success';
  }

  async remove(id: number): Promise<string> {
    await this.churchRepository.delete(id);
    return `Church removed with success`;
  }
}

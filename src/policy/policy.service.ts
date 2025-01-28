import { Injectable, UseGuards } from '@nestjs/common';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/decorators/public.decorator';

@Injectable()
export class PolicyService {
  create(createPolicyDto: CreatePolicyDto) {
    return 'This action adds a new policy';
  }

  findAll() {
    console.log('--test--');
    return `This action returns all policy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} policy`;
  }

  update(id: number, updatePolicyDto: UpdatePolicyDto) {
    return `This action updates a #${id} policy`;
  }

  remove(id: number) {
    return `This action removes a #${id} policy`;
  }
}

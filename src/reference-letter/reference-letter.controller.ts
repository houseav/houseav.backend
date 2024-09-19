import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReferenceLetterService } from './reference-letter.service';
import { CreateReferenceLetterDto } from './dto/create-reference-letter.dto';
import { UpdateReferenceLetterDto } from './dto/update-reference-letter.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('reference-letter')
@Controller('reference-letter')
export class ReferenceLetterController {
  constructor(
    private readonly referenceLetterService: ReferenceLetterService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CreateReferenceLetterDto })
  create(@Body() createReferenceLetterDto: CreateReferenceLetterDto) {
    return this.referenceLetterService.create(createReferenceLetterDto);
  }

  @Get()
  findAll() {
    return this.referenceLetterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referenceLetterService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiBody({ type: UpdateReferenceLetterDto })
  update(
    @Param('id') id: string,
    @Body() updateReferenceLetterDto: UpdateReferenceLetterDto,
  ) {
    return this.referenceLetterService.update(+id, updateReferenceLetterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referenceLetterService.remove(+id);
  }
}

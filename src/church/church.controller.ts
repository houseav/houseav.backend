import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ChurchService } from './church.service';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('church')
@Controller('church')
export class ChurchController {
  constructor(private readonly churchService: ChurchService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CreateChurchDto })
  create(@Body() createChurchDto: CreateChurchDto) {
    return this.churchService.create(createChurchDto);
  }

  @Get()
  findAll() {
    return this.churchService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id param to get the church',
    type: 'integer',
  })
  findOne(@Param('id') id: string) {
    return this.churchService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id param to update the church',
    type: 'integer',
  })
  @ApiBody({ type: UpdateChurchDto })
  update(@Param('id') id: string, @Body() updateChurchDto: UpdateChurchDto) {
    return this.churchService.update(+id, updateChurchDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id param to delete the church',
    type: 'integer',
  })
  remove(@Param('id') id: string) {
    return this.churchService.remove(+id);
  }
}

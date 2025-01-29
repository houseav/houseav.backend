import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MapGeometryService } from './map-geometry.service';
import { CreateMapGeometryDto } from './dto/create-map-geometry.dto';
import { UpdateMapGeometryDto } from './dto/update-map-geometry.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('map-geometry')
export class MapGeometryController {
  constructor(private readonly mapGeometryService: MapGeometryService) {}

  @Post()
  create(@Body() createMapGeometryDto: CreateMapGeometryDto) {
    return this.mapGeometryService.create(createMapGeometryDto);
  }

  @Get()
  findAll() {
    return this.mapGeometryService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mapGeometryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMapGeometryDto: UpdateMapGeometryDto,
  ) {
    return this.mapGeometryService.update(+id, updateMapGeometryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapGeometryService.remove(+id);
  }
}

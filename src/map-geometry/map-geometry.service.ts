import { Injectable } from '@nestjs/common';
import { CreateMapGeometryDto } from './dto/create-map-geometry.dto';
import { UpdateMapGeometryDto } from './dto/update-map-geometry.dto';

@Injectable()
export class MapGeometryService {
  create(createMapGeometryDto: CreateMapGeometryDto) {
    return 'This action adds a new mapGeometry';
  }

  findAll() {
    return `This action returns all mapGeometry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mapGeometry`;
  }

  update(id: number, updateMapGeometryDto: UpdateMapGeometryDto) {
    return `This action updates a #${id} mapGeometry`;
  }

  remove(id: number) {
    return `This action removes a #${id} mapGeometry`;
  }
}

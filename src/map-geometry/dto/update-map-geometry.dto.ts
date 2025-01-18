import { PartialType } from '@nestjs/swagger';
import { CreateMapGeometryDto } from './create-map-geometry.dto';

export class UpdateMapGeometryDto extends PartialType(CreateMapGeometryDto) {}

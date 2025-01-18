import { Module } from '@nestjs/common';
import { MapGeometryService } from './map-geometry.service';
import { MapGeometryController } from './map-geometry.controller';

@Module({
  controllers: [MapGeometryController],
  providers: [MapGeometryService],
})
export class MapGeometryModule {}

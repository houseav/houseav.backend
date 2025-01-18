import { Test, TestingModule } from '@nestjs/testing';
import { MapGeometryController } from './map-geometry.controller';
import { MapGeometryService } from './map-geometry.service';

describe('MapGeometryController', () => {
  let controller: MapGeometryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapGeometryController],
      providers: [MapGeometryService],
    }).compile();

    controller = module.get<MapGeometryController>(MapGeometryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

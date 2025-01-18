import { Test, TestingModule } from '@nestjs/testing';
import { MapGeometryService } from './map-geometry.service';

describe('MapGeometryService', () => {
  let service: MapGeometryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapGeometryService],
    }).compile();

    service = module.get<MapGeometryService>(MapGeometryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ShrinklinkService } from './shrinklink.service';

describe('ShrinklinkService', () => {
  let service: ShrinklinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShrinklinkService],
    }).compile();

    service = module.get<ShrinklinkService>(ShrinklinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

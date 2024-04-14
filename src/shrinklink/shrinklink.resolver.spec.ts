import { Test, TestingModule } from '@nestjs/testing';
import { ShrinklinkResolver } from './shrinklink.resolver';
import { ShrinklinkService } from './shrinklink.service';

describe('ShrinklinkResolver', () => {
  let resolver: ShrinklinkResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShrinklinkResolver, ShrinklinkService],
    }).compile();

    resolver = module.get<ShrinklinkResolver>(ShrinklinkResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

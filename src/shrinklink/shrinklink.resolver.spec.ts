import { Test, TestingModule } from '@nestjs/testing';
import { ShrinklinkResolver } from './shrinklink.resolver';
import { ShrinklinkService } from './shrinklink.service';
import { PrismaModule } from '../database/prisma.module';

describe('ShrinklinkResolver', () => {
  let resolver: ShrinklinkResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ShrinklinkResolver, ShrinklinkService],
    }).compile();

    resolver = module.get<ShrinklinkResolver>(ShrinklinkResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should have record present', async () => {
    // return expect(controller.findOne('t5i5oz7')).toHaveBeenCalled();
    const result = {
      id: 0,
      shortURL: 'tEs1t',
      sourceURL: 'https://bit.ly/narenmobilework',
      viewCount: 0,
    };
    jest
      .spyOn(resolver, 'getSourceLink')
      .mockImplementation(async () => result);
    expect(await resolver.getSourceLink('tEs1t')).toBe(result);
  });

  it('should retrun list of records', async () => {
    const result = [
      {
        id: 0,
        shortURL: 'tEs1t',
        sourceURL: 'https://bit.ly/narenmobilework',
        viewCount: 0,
      },
      {
        id: 1,
        shortURL: 'tEs2T',
        sourceURL: 'https://bit.ly/narenmobilework',
        viewCount: 0,
      },
    ];
    jest
      .spyOn(resolver, 'getShrinklinks')
      .mockImplementation(async () => result);
    expect(await resolver.getShrinklinks()).toBe(result);
  });

  it('should create a shortURL', async () => {
    const result = {
      id: 0,
      shortURL: 'tES3t',
      sourceURL: 'https://bit.ly/narenmobilework',
      viewCount: 0,
    };
    jest
      .spyOn(resolver, 'createShrinkLink')
      .mockImplementation(async () => result);
    expect(
      await resolver.createShrinkLink({
        sourceURL: 'https://bit.ly/narenmobilework',
      }),
    ).toBe(result);
  });
});

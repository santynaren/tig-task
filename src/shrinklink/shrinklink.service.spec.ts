import { Test, TestingModule } from '@nestjs/testing';
import { ShrinklinkService } from './shrinklink.service';
import { PrismaModule } from '../database/prisma.module';
import { Shrinklink } from './entities/shrinklink.entity';
import { PrismaService } from '../database/prisma.service';
import { ShrinklinkResolver } from './shrinklink.resolver';

describe('ShrinklinkService', () => {
  let service: ShrinklinkService;
  let shrinkLink: Shrinklink;
  let findUniqueMock: jest.Mock;
  let findManyMock: jest.Mock;
  let createMock: jest.Mock;
  beforeEach(async () => {
    findUniqueMock = jest.fn();
    findManyMock = jest.fn();
    createMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        ShrinklinkService,
        ShrinklinkResolver,
        {
          provide: PrismaService,
          useValue: {
            urlTable: {
              findUnique: findUniqueMock,
              findMany: findManyMock,
              create: createMock,
            },
          },
        },
      ],
    }).compile();
    shrinkLink = {
      id: 1,
      sourceURL: 'https://www.google.com',
      shortURL: 'http://localhost:3000/test189',
      viewCount: 0,
    };
    findUniqueMock.mockResolvedValueOnce(shrinkLink);
    findManyMock.mockResolvedValue([shrinkLink]);
    createMock.mockResolvedValue(shrinkLink);
    service = module.get<ShrinklinkService>(ShrinklinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have record present test189', async () => {
    const result = await service.getSourceLink('http://localhost:3000/test189');
    expect(result).toStrictEqual(shrinkLink);
  });

  it('should not have record present test189', async () => {
    jest.spyOn(service, 'getSourceLink').mockResolvedValue(shrinkLink);
    const result = await service.getSourceLink('http://localhost:3000/test19e');
    expect(result).toBe(shrinkLink);
  });

  it('should get all URLs', async () => {
    const result = await service.getAllShrinkLinks();
    expect(result).toStrictEqual([shrinkLink]);
  });

  it('create a new shortURL', async () => {
    const result = await service.createShrinkLink({
      sourceURL: 'facebook.com',
    });
    expect(result).toBeInstanceOf(Object);
  });
});

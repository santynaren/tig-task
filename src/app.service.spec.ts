import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Shrinklink } from './shrinklink/entities/shrinklink.entity';
import { PrismaModule } from './database/prisma.module';
import { PrismaService } from './database/prisma.service';

describe('app service tests', () => {
  let service: AppService;
  let findUniqueMock: jest.Mock;
  let updateMock: jest.Mock;
  let shrinkLink: Shrinklink;
  beforeEach(async () => {
    findUniqueMock = jest.fn();
    updateMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: {
            urlTable: {
              findUnique: findUniqueMock,
              update: updateMock,
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
    findUniqueMock.mockResolvedValue(shrinkLink);
    updateMock.mockResolvedValue(shrinkLink);
    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have record present test189', async () => {
    const result = await service.redirectToSourceLink('test189');
    expect(result).toStrictEqual({
      url: 'https://www.google.com',
    });
  });

  it('wrongURL method is called', async () => {
    const result = await service.handleWrongLink();
    expect(result).toBe('No such URL exists');
  });
});

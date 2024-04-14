import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [PrismaModule],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should throw error', () => {
    return expect(appController.redirectToSourceLink('32')).resolves.toBe(
      'No such URL exists',
    );
  });

  it('should have record present', async () => {
    const result = { url: 'record present url' };
    jest
      .spyOn(appController, 'redirectToSourceLink')
      .mockImplementation(async () => result);
    expect(await appController.redirectToSourceLink('testURL')).toBe(result);
  });

  it('test wrong URL', () => {
    return expect(appController.wrongLink()).resolves.toBe(
      'No such URL exists',
    );
  });
});

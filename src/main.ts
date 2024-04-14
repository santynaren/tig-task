import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionHandler } from './exceptionHandler/prisma-exception-handler';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionHandler());
  await app.listen(3000);
}
bootstrap();

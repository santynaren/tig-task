import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShrinklinkModule } from './shrinklink/shrinklink.module';

@Module({
  imports: [ShrinklinkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

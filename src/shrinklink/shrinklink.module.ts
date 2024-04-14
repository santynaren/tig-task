import { Module } from '@nestjs/common';
import { ShrinklinkService } from './shrinklink.service';
import { ShrinklinkResolver } from './shrinklink.resolver';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ShrinklinkResolver, ShrinklinkService],
  exports: [ShrinklinkResolver, ShrinklinkService],
})
export class ShrinklinkModule {}

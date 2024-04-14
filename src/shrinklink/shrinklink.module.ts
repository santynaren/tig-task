import { Module } from '@nestjs/common';
import { ShrinklinkService } from './shrinklink.service';
import { ShrinklinkResolver } from './shrinklink.resolver';

@Module({
  providers: [ShrinklinkResolver, ShrinklinkService],
})
export class ShrinklinkModule {}

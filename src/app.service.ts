import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return '<h1>ShrinkLink - URL Shortener Project</h1><p>The following task is being completed by Narendra as part of TIG Company Interview for the Role of Senior Software Engineer</p><h2>';
  }

  public async handleWrongLink() {
    return 'No such URL exists';
  }

  public async redirectToSourceLink(
    shortURL: string,
  ): Promise<{ url: string } | string> {
    const getSourceURL = await this.prisma.urlTable.findUnique({
      where: {
        shortURL: process.env.HOST_PATH + shortURL,
      },
    });
    if (getSourceURL !== null) {
      
      await this.prisma.urlTable.update({
        where: { shortURL: process.env.HOST_PATH + shortURL },
        data: { viewCount: { increment: 1 } },
      });
      return { url: getSourceURL.sourceURL };
    }
    return this.handleWrongLink();
  }
}

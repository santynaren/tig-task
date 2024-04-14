import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
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
    } else {
      return this.handleWrongLink();
    }
  }
}

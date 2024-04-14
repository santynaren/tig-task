import { Injectable } from '@nestjs/common';
import { CreateShrinklinkInput } from './dto/create-shrinklink.input';
import { PrismaService } from 'src/database/prisma.service';
import { Shrinklink } from './entities/shrinklink.entity';
import { getShortVersionUrl } from 'src/utils/url.helper';

@Injectable()
export class ShrinklinkService {
  constructor(private prisma: PrismaService) {}
  public async createShrinkLink(
    createShrinklinkInput: CreateShrinklinkInput,
  ): Promise<Shrinklink> {
    const newShrinkLinkPlaceholder = await getShortVersionUrl();

    const createNewShrinkLink = await this.prisma.urlTable.create({
      data: {
        shortURL: process.env.HOST_PATH + newShrinkLinkPlaceholder,
        sourceURL: createShrinklinkInput.sourceURL,
        viewCount: 0,
      },
    });
    return createNewShrinkLink;
  }

  public async getAllShrinkLinks(): Promise<Shrinklink[]> {
    const getAllShrinkLinks = await this.prisma.urlTable.findMany();
    return getAllShrinkLinks;
  }

  public async getSourceLink(shortURL: string): Promise<Shrinklink> {
    const getSourceLink = await this.prisma.urlTable.findUnique({
      where: {
        shortURL: shortURL,
      },
    });

    if (getSourceLink !== null) {
      return getSourceLink;
    } else {
      return {
        id: 0,
        shortURL: null,
        sourceURL: 'No Such URL Exists',
        viewCount: 0,
      };
    }
  }
}

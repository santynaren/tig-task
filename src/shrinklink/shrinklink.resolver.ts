import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShrinklinkService } from './shrinklink.service';
import { Shrinklink } from './entities/shrinklink.entity';
import { CreateShrinklinkInput } from './dto/create-shrinklink.input';
import { validateShortUrl } from 'src/utils/url.helper';

@Resolver(() => Shrinklink)
export class ShrinklinkResolver {
  constructor(private readonly shrinklinkService: ShrinklinkService) {}

  @Mutation(() => Shrinklink)
  async createShrinkLink(
    @Args('createShrinklinkInput') createShrinklinkInput: CreateShrinklinkInput,
  ): Promise<Shrinklink> {
    if (createShrinklinkInput.sourceURL.length > 7) {
      try {
        return this.shrinklinkService.createShrinkLink(createShrinklinkInput);
      } catch (e) {
        throw e;
      }
    } else {
      throw 'URL Length Must be more than 7 Characters';
    }
  }

  @Query(() => [Shrinklink], { name: 'getShrinklinks', nullable: true })
  async getShrinklinks(): Promise<Shrinklink[] | null> {
    return this.shrinklinkService.getAllShrinkLinks();
  }

  @Query(() => Shrinklink, { name: 'getSourceLink' })
  async getSourceLink(
    @Args('shortURL', { type: () => String }) shortURL: string,
  ) {
    if (validateShortUrl(shortURL)) {
      try {
        return this.shrinklinkService.getSourceLink(shortURL);
      } catch (e) {
        throw e;
      }
    } else {
      throw 'Wrong Shorten URL';
    }
  }
}

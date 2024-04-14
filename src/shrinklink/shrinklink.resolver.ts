import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShrinklinkService } from './shrinklink.service';
import { Shrinklink } from './entities/shrinklink.entity';
import { CreateShrinklinkInput } from './dto/create-shrinklink.input';
import { UpdateShrinklinkInput } from './dto/update-shrinklink.input';

@Resolver(() => Shrinklink)
export class ShrinklinkResolver {
  constructor(private readonly shrinklinkService: ShrinklinkService) {}

  @Mutation(() => Shrinklink)
  createShrinklink(@Args('createShrinklinkInput') createShrinklinkInput: CreateShrinklinkInput) {
    return this.shrinklinkService.create(createShrinklinkInput);
  }

  @Query(() => [Shrinklink], { name: 'shrinklink' })
  findAll() {
    return this.shrinklinkService.findAll();
  }

  @Query(() => Shrinklink, { name: 'shrinklink' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shrinklinkService.findOne(id);
  }

  @Mutation(() => Shrinklink)
  updateShrinklink(@Args('updateShrinklinkInput') updateShrinklinkInput: UpdateShrinklinkInput) {
    return this.shrinklinkService.update(updateShrinklinkInput.id, updateShrinklinkInput);
  }

  @Mutation(() => Shrinklink)
  removeShrinklink(@Args('id', { type: () => Int }) id: number) {
    return this.shrinklinkService.remove(id);
  }
}

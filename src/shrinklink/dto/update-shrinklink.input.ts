import { CreateShrinklinkInput } from './create-shrinklink.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShrinklinkInput extends PartialType(CreateShrinklinkInput) {
  @Field(() => Int)
  id: number;
}

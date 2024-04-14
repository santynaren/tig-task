import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateShrinklinkInput {
  @Field(() => String, { description: 'destination URL' })
  sourceURL: string;
}

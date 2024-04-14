import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Shrinklink {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

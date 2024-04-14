import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Shrinklink {
  @Field(() => Int, { description: 'unique Identification' })
  id: number;
  @Field(() => String, { description: 'short url' })
  shortURL: string;
  @Field(() => String, { description: 'destination url' })
  sourceURL: string;
  @Field(() => Int, { description: 'view count' })
  viewCount: number;
}

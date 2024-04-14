import { IsNotEmpty } from '@nestjs/class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateShrinklinkInput {
  @Field(() => String, { description: 'destination URL' })
  @IsNotEmpty()
  sourceURL: string;
}

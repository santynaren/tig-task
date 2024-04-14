import { IsNotEmpty, IsUrl } from '@nestjs/class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateShrinklinkInput {
  @Field(() => String, { description: 'destination URL' })
  @IsNotEmpty()
  @IsUrl()
  @Length(13)
  sourceURL: string;
}

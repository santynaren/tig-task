import {
  Catch,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionHandler implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError): any {
    switch (exception.code) {
      case 'P2003': {
        throw new UnprocessableEntityException('Link does not exist');
      }
      case 'P2025': {
        throw new NotFoundException('Unable to find the URL');
      }
      default:
        break;
    }

    return exception;
  }
}

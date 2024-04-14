import { Injectable } from '@nestjs/common';
import { CreateShrinklinkInput } from './dto/create-shrinklink.input';
import { UpdateShrinklinkInput } from './dto/update-shrinklink.input';

@Injectable()
export class ShrinklinkService {
  create(createShrinklinkInput: CreateShrinklinkInput) {
    return 'This action adds a new shrinklink';
  }

  findAll() {
    return `This action returns all shrinklink`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shrinklink`;
  }

  update(id: number, updateShrinklinkInput: UpdateShrinklinkInput) {
    return `This action updates a #${id} shrinklink`;
  }

  remove(id: number) {
    return `This action removes a #${id} shrinklink`;
  }
}

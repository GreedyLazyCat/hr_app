import { Injectable } from '@nestjs/common';
import { type DbType, InjectDb } from 'src/db/db';

@Injectable()
export class DepartmentRepository {
  constructor(@InjectDb() db: DbType) {}

  findAll() {
    return `This action returns all department`;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }
}

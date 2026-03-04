import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';

@Injectable()
export class DepartmentService {
  constructor(departmentRepo: DepartmentRepository) {}

  findAll() {
    return `This action returns all department`;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

}

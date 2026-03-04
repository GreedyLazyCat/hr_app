import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { DepartmentFilterDto } from './dto/department-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class DepartmentService {
  constructor(private departmentRepo: DepartmentRepository) {}

  findAll(filters: DepartmentFilterDto, pagination: PaginationDto) {
    return this.departmentRepo.findAll(filters, pagination);
  }

  findOne(id: number) {
    return this.departmentRepo.findOne(id);
  }
}

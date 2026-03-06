import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { DepartmentFilterDto } from './dto/department-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ListReturn } from 'src/common/types';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(private departmentRepo: DepartmentRepository) {}

  async findAll(
    filters: DepartmentFilterDto,
    pagination: PaginationDto,
  ): Promise<ListReturn<Department>> {
    const data = await this.departmentRepo.findAll(filters, pagination);
    return {
      data,
      page: pagination.page,
      itemsPerPage: pagination.itemsPerPage,
      isLastPage: pagination.itemsPerPage > data.length,
    };
  }

  findOne(id: number) {
    return this.departmentRepo.findOne(id);
  }
}

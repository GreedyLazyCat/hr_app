import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './employee.repository';
import { EmployeeFilterDto } from './dto/employee-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ListReturn } from 'src/common/types';
import { EmployeeFull } from './entities/employee-full.entity';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepo: EmployeeRepository) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepo.create(createEmployeeDto);
  }

  async findAllFull(
    filters: EmployeeFilterDto,
    pagination: PaginationDto,
  ): Promise<ListReturn<EmployeeFull>> {
    const data = await this.employeeRepo.findAllFull(filters, pagination);
    return {
      data,
      page: pagination.page,
      itemsPerPage: pagination.itemsPerPage,
      isLastPage: pagination.itemsPerPage > data.length,
    };
  }

  findOne(id: number) {
    return this.employeeRepo.findOne(id);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);

    if (employee.isFired) {
      throw new ForbiddenException(
        'Нельзя редактировать уволенного сотрудника.',
      );
    }

    return await this.employeeRepo.update(id, updateEmployeeDto);
  }

  remove(id: number) {
    return this.employeeRepo.remove(id);
  }
}

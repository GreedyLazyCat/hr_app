import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './employee.repository';
import { EmployeeFilterDto } from './dto/employee-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepo: EmployeeRepository) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepo.create(createEmployeeDto);
  }

  findAllFull(filters: EmployeeFilterDto, pagination: PaginationDto) {
    return this.findAllFull(filters, pagination);
  }

  findOne(id: number) {
    return this.employeeRepo.findOne(id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeRepo.update(id, updateEmployeeDto);
  }

  remove(id: number) {
    return this.employeeRepo.remove(id);
  }
}

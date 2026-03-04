import { ForbiddenException, Injectable } from '@nestjs/common';
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
    return this.employeeRepo.findAllFull(filters, pagination);
  }

  findOne(id: number) {
    return this.employeeRepo.findOne(id);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);

    if (employee.isFired) {
      throw new ForbiddenException();
    }

    return await this.employeeRepo.update(id, updateEmployeeDto);
  }

  remove(id: number) {
    return this.employeeRepo.remove(id);
  }
}

import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentFilterDto } from './dto/department-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll(
    @Query() filters: DepartmentFilterDto,
    @Query() pagination: PaginationDto,
  ) {
    return this.departmentService.findAll(filters, pagination);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentService.findOne(id);
  }
}

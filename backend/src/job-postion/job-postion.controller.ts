import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { JobPositionService } from './job-postion.service';
import { JobPostionFilter } from './dto/job-postion-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('job-position')
export class JobPositionController {
  constructor(private readonly jobPostionService: JobPositionService) {}

  @Get()
  findAll(
    @Query() filters: JobPostionFilter,
    @Query() pagination: PaginationDto,
  ) {
    return this.jobPostionService.findAll(filters, pagination);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobPostionService.findOne(id);
  }
}

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
import { JobPostionService } from './job-postion.service';
import { CreateJobPostionDto } from './dto/create-job-postion.dto';
import { UpdateJobPostionDto } from './dto/update-job-postion.dto';
import { JobPostionFilter } from './dto/job-postion-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('job-postion')
export class JobPostionController {
  constructor(private readonly jobPostionService: JobPostionService) {}

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

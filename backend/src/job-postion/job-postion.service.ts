import { Injectable } from '@nestjs/common';
import { CreateJobPostionDto } from './dto/create-job-postion.dto';
import { UpdateJobPostionDto } from './dto/update-job-postion.dto';
import { JobPostionFilter } from './dto/job-postion-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { JobPostionRepository } from './job-postion.repository';

@Injectable()
export class JobPostionService {
  constructor(private jobPostionRepo: JobPostionRepository) {}

  findAll(filters: JobPostionFilter, pagination: PaginationDto) {
    return this.jobPostionRepo.findAll(filters, pagination);
  }

  findOne(id: number) {
    return this.jobPostionRepo.findOne(id);
  }
}

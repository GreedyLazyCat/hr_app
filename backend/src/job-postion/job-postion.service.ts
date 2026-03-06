import { Injectable } from '@nestjs/common';
import { CreateJobPostionDto } from './dto/create-job-postion.dto';
import { UpdateJobPostionDto } from './dto/update-job-postion.dto';
import { JobPostionFilter } from './dto/job-postion-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { JobPositionRepository } from './job-postion.repository';
import { JobPostion } from './entities/job-postion.entity';
import { ListReturn } from 'src/common/types';

@Injectable()
export class JobPositionService {
  constructor(private jobPostionRepo: JobPositionRepository) {}

  async findAll(
    filters: JobPostionFilter,
    pagination: PaginationDto,
  ): Promise<ListReturn<JobPostion>> {
    const data = await this.jobPostionRepo.findAll(filters, pagination);
    return {
      data,
      page: pagination.itemsPerPage,
      itemsPerPage: pagination.itemsPerPage,
      isLastPage: pagination.itemsPerPage > data.length,
    };
  }

  findOne(id: number) {
    return this.jobPostionRepo.findOne(id);
  }
}

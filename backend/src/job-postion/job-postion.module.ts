import { Module } from '@nestjs/common';
import { JobPostionService } from './job-postion.service';
import { JobPostionController } from './job-postion.controller';
import { DbModule } from 'src/db/db.module';
import { JobPostionRepository } from './job-postion.repository';

@Module({
  imports: [DbModule],
  controllers: [JobPostionController],
  providers: [JobPostionService, JobPostionRepository],
})
export class JobPostionModule {}

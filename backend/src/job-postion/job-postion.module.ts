import { Module } from '@nestjs/common';
import { JobPositionService } from './job-postion.service';
import { JobPositionController } from './job-postion.controller';
import { DbModule } from 'src/db/db.module';
import { JobPositionRepository } from './job-postion.repository';

@Module({
  imports: [DbModule],
  controllers: [JobPositionController],
  providers: [JobPositionService, JobPositionRepository],
})
export class JobPostionModule {}

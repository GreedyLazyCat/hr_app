import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { DepartmentModule } from './department/department.module';
import { JobPostionModule } from './job-postion/job-postion.module';

@Module({
  imports: [DbModule, DepartmentModule, JobPostionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

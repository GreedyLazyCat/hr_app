import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { DepartmentModule } from './department/department.module';
import { JobPostionModule } from './job-postion/job-postion.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [DbModule, DepartmentModule, JobPostionModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentRepository } from './department.repository';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentRepository],
})
export class DepartmentModule {}

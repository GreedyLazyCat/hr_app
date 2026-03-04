import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [DbModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

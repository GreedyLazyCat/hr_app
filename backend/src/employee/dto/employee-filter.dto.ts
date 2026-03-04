import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmployeeFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullName?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  departmentId?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  jobPostionId?: number;
}

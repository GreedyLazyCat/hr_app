import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DepartmentFilterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JobPostionFilter {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}

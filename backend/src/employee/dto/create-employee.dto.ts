import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  patronymic?: string | null | undefined;

  @IsDateString()
  @MaxLength(10)
  brithDate: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  passportSeriesAndNumber: string;

  @IsString()
  @IsNotEmpty()
  contacts: string;

  @IsString()
  @IsNotEmpty()
  adress: string;

  @IsString()
  @IsNotEmpty()
  salary: number;

  @IsString()
  @IsNotEmpty()
  hireDate: string;

  @IsString()
  @IsNotEmpty()
  isFired: boolean;

  @IsInt()
  @IsNotEmpty()
  departmentId: number;

  @IsInt()
  @IsNotEmpty()
  jobPositionId: number;
}

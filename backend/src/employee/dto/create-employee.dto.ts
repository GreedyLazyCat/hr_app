import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumberString,
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
  birthDate: string;

  @IsNumberString()
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

  @IsInt()
  salary: number;

  @IsDateString()
  @MaxLength(10)
  hireDate: string;

  @IsInt()
  @IsNotEmpty()
  departmentId: number;

  @IsInt()
  @IsNotEmpty()
  jobPositionId: number;
}

import { Department } from 'src/department/entities/department.entity';
import { JobPostion } from 'src/job-postion/entities/job-postion.entity';

export class EmployeeFull {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  birthDate: string;
  passportSeriesAndNumber: string;
  contacts: string;
  adress: string;
  salary: number;
  hireDate: string;
  isFired: boolean;
  department: Department | null;
  jobPosition: JobPostion | null;
  fullName: string | null;
}

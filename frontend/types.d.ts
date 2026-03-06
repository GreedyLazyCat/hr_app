declare global {
  interface EmployeeFullServer {
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

  interface EmployeeFull {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
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

  interface Department {
    id: number;
    name: string;
  }

  interface JobPostion {
    id: number;
    name: string;
  }

  type EmployeeFullWOId = Omit<EmployeeFull, "id" | "fullName" | "isFired">;
}

export {};

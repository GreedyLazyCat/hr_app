import { table } from 'console';
import { sql, SQL } from 'drizzle-orm';
import {
  pgTable,
  integer,
  varchar,
  text,
  date,
  boolean,
  uniqueIndex,
  serial,
  index,
} from 'drizzle-orm/pg-core';

export const department = pgTable(
  'department',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
  },
  (table) => [
    index('department_name_trgm_index').using(
      'gin',
      sql`${table.name} gin_trgm_ops`,
    ),
  ],
);

export const jobPostion = pgTable(
  'job_postion',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
  },

  (table) => [
    index('job_postion_name_trgm_index').using(
      'gin',
      sql`${table.name} gin_trgm_ops`,
    ),
  ],
);

export const employee = pgTable(
  'employee',
  {
    id: serial('id').primaryKey(),

    firstName: varchar('first_name', { length: 255 }).notNull(),

    lastName: varchar('last_name', { length: 255 }).notNull(),

    patronymic: varchar('patronymic', { length: 255 }),

    brithDate: date('brith_date').notNull(),

    passportSeriesAndNumber: varchar('passport_series_and_number', {
      length: 10,
    }).notNull(),

    contacts: text('contacts').notNull(),

    adress: text('adress').notNull(),

    salary: integer('salary').notNull(),

    hireDate: date('hire_date').notNull(),

    isFired: boolean('is_fired').notNull(),

    departmentId: integer('department_id')
      .notNull()
      .references(() => department.id),

    jobPositionId: integer('job_position_id')
      .notNull()
      .references(() => jobPostion.id),

    fullName: text('full_name').generatedAlwaysAs(
      (): SQL =>
        sql`${employee.firstName} || ' ' || ${employee.lastName} || ' ' || coalesce(${employee.patronymic}, '')`,
    ),
  },
  (table) => [
    uniqueIndex('employee_department_unique_idx').on(table.departmentId),
    uniqueIndex('employee_job_position_unique_idx').on(table.jobPositionId),
    index('teacher_name_search_index').using(
      'gin',
      sql`to_tsvector('russian', ${table.fullName})`,
    ),
    index('tracher_name_trgrm_index').using(
      'gin',
      sql`${table.fullName} gin_trgm_ops`,
    ),
  ],
);

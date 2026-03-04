import {
  pgTable,
  integer,
  varchar,
  text,
  date,
  boolean,
  uniqueIndex,
  serial,
} from 'drizzle-orm/pg-core';

export const department = pgTable('department', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const jobPostion = pgTable('job_postion', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

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
  },
  (table) => [
    uniqueIndex('employee_department_unique_idx').on(table.departmentId),
    uniqueIndex('employee_job_position_unique_idx').on(table.jobPositionId),
  ],
);

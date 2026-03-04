import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { type DbType, InjectDb } from 'src/db/db';
import { department, employee, jobPostion } from 'src/db/schema';
import {
  ilike,
  or,
  sql,
  SQL,
  and,
  eq,
  getTableColumns,
  desc,
} from 'drizzle-orm';
import { EmployeeRepoFilterDto } from './dto/repo/employee-repo-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { withPagination } from 'src/common/utils/with-pagination';
import { ObjectNotFoundException } from 'src/common/exception/object-not-found.exception';
import { Employee } from './entities/employee.entity';
import { EmployeeFull } from './entities/employee-full.entity';

type ASD = typeof employee.$inferInsert;

@Injectable()
export class EmployeeRepository {
  constructor(@InjectDb() private db: DbType) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const result = await this.db
      .insert(employee)
      .values(createEmployeeDto)
      .returning();

    if (result.length < 1) {
      return null;
    }

    return result[0];
  }

  private getSqlFilters(filters: EmployeeRepoFilterDto) {
    const sqlFilters: (SQL | undefined)[] = [];

    if (filters.fullName) {
      sqlFilters.push(
        or(
          sql`ts_vector('russian', employee.fullName) @@ websearch_to_tsquery('russian', ${filters.fullName})`,
          sql`similarity(${employee.fullName}, ${filters.fullName}) > 0.3`,
          ilike(employee.fullName, `%${filters.fullName}%`),
        ),
      );
    }

    if (filters.departmentId) {
      sqlFilters.push(eq(employee.departmentId, filters.departmentId));
    }

    if (filters.jobPostionId) {
      sqlFilters.push(eq(employee.jobPositionId, filters.jobPostionId));
    }

    return sqlFilters;
  }

  async findAllFull(
    filters: EmployeeRepoFilterDto,
    pagination?: PaginationDto,
  ): Promise<EmployeeFull[]> {
    const sqlFilters = this.getSqlFilters(filters);
    const orderFilters: SQL[] = [];

    const { jobPositionId, departmentId, ...rest } = getTableColumns(employee);
    let columns = {
      ...rest,
    };

    if (filters.fullName) {
      const orderColumns = {
        textSearchRank: sql`ts_rank(to_tsvector('russian', ${employee.fullName}), websearch_to_tsquery('russian', ${filters.fullName}))`,
        textSearchSimilarity: sql`similarity(${employee.fullName},${filters.fullName})`,
      };
      columns = {
        ...columns,
        ...orderColumns,
      };
      orderFilters.push(
        desc(orderColumns.textSearchRank),
        desc(orderColumns.textSearchSimilarity),
      );
    }

    let query = this.db
      .select({
        ...columns,
        department: department,
        jobPosition: jobPostion,
      })
      .from(employee)
      .leftJoin(department, eq(employee.departmentId, department.id))
      .leftJoin(jobPostion, eq(employee.jobPositionId, jobPostion.id))
      .where(and(...sqlFilters))
      .$dynamic();

    if (pagination) {
      query = withPagination(query, pagination);
    }
    query = query.orderBy(...orderFilters);

    return await query;
  }

  async findAll(filters: EmployeeRepoFilterDto, pagination?: PaginationDto) {
    const sqlFilters = this.getSqlFilters(filters);
    const orderFilters: SQL[] = [];

    let columns = {
      ...getTableColumns(employee),
    };

    if (filters.fullName) {
      const orderColumns = {
        textSearchRank: sql`ts_rank(to_tsvector('russian', ${employee.fullName}), websearch_to_tsquery('russian', ${filters.fullName}))`,
        textSearchSimilarity: sql`similarity(${employee.fullName},${filters.fullName})`,
      };
      columns = {
        ...columns,
        ...orderColumns,
      };
      orderFilters.push(
        desc(orderColumns.textSearchRank),
        desc(orderColumns.textSearchSimilarity),
      );
    }

    let query = this.db
      .select(columns)
      .from(employee)
      .where(and(...sqlFilters))
      .$dynamic();

    if (pagination) {
      query = withPagination(query, pagination);
    }
    query = query.orderBy(...orderFilters);

    return await query;
  }

  async findOne(id: number): Promise<Employee> {
    const result = await this.db
      .select()
      .from(employee)
      .where(eq(employee.id, id));

    if (result.length < 1) {
      throw new ObjectNotFoundException(Employee.name, id);
    }

    return result[0];
  }

  async findOneFull(id: number): Promise<EmployeeFull> {
    const { jobPositionId, departmentId, ...rest } = getTableColumns(employee);

    const result = await this.db
      .select({
        ...rest,
        department: department,
        jobPosition: jobPostion,
      })
      .from(employee)
      .leftJoin(department, eq(employee.departmentId, department.id))
      .leftJoin(jobPostion, eq(employee.jobPositionId, jobPostion.id))
      .where(eq(employee.id, id));

    if (result.length < 1) {
      throw new ObjectNotFoundException(Employee.name, id);
    }

    return result[0];
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const result = await this.db
      .update(employee)
      .set(updateEmployeeDto)
      .returning();

    if (result.length < 1) {
      return null;
    }

    return result[0];
  }

  async remove(id: number) {
    const result = await this.db
      .delete(employee)
      .where(eq(employee.id, id))
      .returning();

    if (result.length < 1) {
      throw new ObjectNotFoundException(Employee.name, id);
    }

    return result[0];
  }
}

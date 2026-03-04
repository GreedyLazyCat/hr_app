import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { type DbType, InjectDb } from 'src/db/db';
import { DepartmentRepoFilterDto } from './dto/repo/deprartment-repo-filter.dto';
import { sql, SQL, and, eq, or, ilike } from 'drizzle-orm';
import { Department } from './entities/department.entity';
import { department } from 'src/db/schema';
import { ObjectNotFoundException } from 'src/common/exception/object-not-found.exception';
import { withPagination } from 'src/common/utils/with-pagination';

@Injectable()
export class DepartmentRepository {
  constructor(@InjectDb() private db: DbType) {}

  private getSqlFilters(filters: DepartmentRepoFilterDto) {
    const sqlFilters: (SQL | undefined)[] = [];

    if (filters.name) {
      sqlFilters.push(
        or(
          sql`similarity(${department.name}, ${filters.name}) > 0.3`,
          ilike(department.name, `%${filters.name}%`),
        ),
      );
    }

    return sqlFilters;
  }

  async findAll(
    filters: DepartmentRepoFilterDto,
    pagination?: PaginationDto,
  ): Promise<Department[]> {
    const sqlFilters = this.getSqlFilters(filters);

    let query = this.db
      .select()
      .from(department)
      .where(and(...sqlFilters))
      .$dynamic();

    if (pagination) {
      query = withPagination(query, pagination);
    }

    return await query;
  }

  async findOne(id: number): Promise<Department> {
    const result = await this.db
      .select()
      .from(department)
      .where(eq(department.id, id));
    if (result.length < 1) {
      throw new ObjectNotFoundException(Department.name, id);
    }
    return result[0];
  }
}

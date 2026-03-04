import { Injectable } from '@nestjs/common';
import { ilike, or, sql, SQL, and, eq } from 'drizzle-orm';
import { type DbType, InjectDb } from 'src/db/db';
import { jobPostion } from 'src/db/schema';
import { JobPostionRepoFilter } from './dto/repo/job-postion-repo-filter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { JobPostion } from './entities/job-postion.entity';
import { withPagination } from 'src/common/utils/with-pagination';
import { ObjectNotFoundException } from 'src/common/exception/object-not-found.exception';

@Injectable()
export class JobPostionRepository {
  constructor(@InjectDb() private db: DbType) {}

  private getSqlFilters(filters: JobPostionRepoFilter) {
    const sqlFilters: (SQL | undefined)[] = [];

    if (filters.name) {
      sqlFilters.push(
        or(
          sql`similarity(${jobPostion.name}, ${filters.name}) > 0.3`,
          ilike(jobPostion.name, `%${filters.name}%`),
        ),
      );
    }

    return sqlFilters;
  }

  async findAll(
    filters: JobPostionRepoFilter,
    pagination?: PaginationDto,
  ): Promise<JobPostion[]> {
    const sqlFilters = this.getSqlFilters(filters);

    let query = this.db
      .select()
      .from(jobPostion)
      .where(and(...sqlFilters))
      .$dynamic();

    if (pagination) {
      query = withPagination(query, pagination);
    }

    return await query;
  }

  async findOne(id: number): Promise<JobPostion> {
    const result = await this.db
      .select()
      .from(jobPostion)
      .where(eq(jobPostion.id, id));
    if (result.length < 1) {
      throw new ObjectNotFoundException(JobPostion.name, id);
    }
    return result[0];
  }
}

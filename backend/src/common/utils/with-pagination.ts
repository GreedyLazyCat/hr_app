import { PgSelect } from 'drizzle-orm/pg-core';
import { PaginationDto } from '../dto/pagination.dto';

export function withPagination<T extends PgSelect>(
  qb: T,
  pagination: PaginationDto,
) {
  return qb
    .limit(pagination.itemsPerPage)
    .offset((pagination.page - 1) * pagination.itemsPerPage);
}

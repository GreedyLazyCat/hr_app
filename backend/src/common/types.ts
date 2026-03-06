export interface ListReturn<T> {
  data: T[];
  page: number;
  itemsPerPage: number;
  isLastPage: boolean;
}

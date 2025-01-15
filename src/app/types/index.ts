export interface PaginationParams {
  offset?: number;
  limit?: number;
}

export interface PaginatedData<T> {
  data: T[];
  offset: number;
  limit: number;
  fullyLoaded?: boolean;
}

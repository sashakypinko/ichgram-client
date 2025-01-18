import { useEffect } from 'react';
import { PaginatedData, PaginationParams } from '@app/types';

type Cb = () => void;

export interface DataWithPaginationControl<T> {
  data: T[];
  next: Cb;
  reset: Cb;
}

const usePagination = <T>(
  { data, offset, limit, fullyLoaded }: PaginatedData<T>,
  fetchDataCallback: (params: PaginationParams) => void,
  loadDependencies: (string | number | null | undefined)[] = [],
  reloadOnMounted: boolean = false,
): DataWithPaginationControl<T> => {
  const next = () => {
    if (fullyLoaded) return;
    fetchDataCallback({ offset: offset + limit, limit });
  };

  const reset = () => {
    fetchDataCallback({});
  };

  useEffect(() => {
    if (loadDependencies.length || (reloadOnMounted || !data.length)) {
      reset();
    }
  }, loadDependencies);

  return { data, next, reset };
};

export default usePagination;

import { PaginatedData } from '@app/types';

export const preparePaginatedResponseData = <T>(payload: PaginatedData<T>, oldData: T[]): PaginatedData<T> => {
  return {
    data: payload.offset ? [...oldData, ...payload.data] : payload.data,
    offset: payload.offset,
    limit: payload.limit,
    fullyLoaded: !payload.data.length || payload.data.length < payload.limit,
  };
};

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { PaginationParams } from '@app/types';
import usePagination, { DataWithPaginationControl } from '@shared/hooks/use-pagination.hook';
import { IUser } from '@entities/user/model/user';
import { selectUser } from '@entities/user/store/selectors';
import { searchUsers } from '@entities/user/store/slice';

const usePaginatedSearchedUsers = (search: string, overlayOpened: boolean = true): DataWithPaginationControl<IUser> => {
  const { users } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const fetchData = (params: PaginationParams): void => {
    if (overlayOpened) {
      dispatch(searchUsers({ search, ...params }));
    }
  };

  return usePagination<IUser>(users, fetchData, [search]);
};

export default usePaginatedSearchedUsers;

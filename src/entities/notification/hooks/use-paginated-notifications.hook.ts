import { useAppDispatch, useAppSelector } from '@app/hooks';
import { PaginationParams } from '@app/types';
import usePagination, { DataWithPaginationControl } from '@shared/hooks/use-pagination.hook';
import { INotification } from '@entities/notification/model/notification';
import { selectNotification } from '@entities/notification/store/selectors';
import { getNotifications } from '@entities/notification/store/slice';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook.ts';

const usePaginatedNotifications = (): DataWithPaginationControl<INotification> => {
  const { notifications } = useAppSelector(selectNotification);
  const dispatch = useAppDispatch();
  const authUser = useAuthUser();

  const fetchData = (params: PaginationParams): void => {
    if (authUser) {
      dispatch(getNotifications(params));
    }
  };

  return usePagination<INotification>(notifications, fetchData, [authUser?._id]);
};

export default usePaginatedNotifications;

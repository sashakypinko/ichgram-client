import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import { getUserPosts } from '@entities/post/store/slice';
import { PaginationParams } from '@app/types';
import { IPost } from '@entities/post/model/post';
import usePagination, { DataWithPaginationControl } from '@shared/hooks/use-pagination.hook';

const useUserPostsPagination = (userId?: string): DataWithPaginationControl<IPost> => {
  const { userPosts } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();

  const fetchData = (params: PaginationParams): void => {
    if (userId) {
      dispatch(getUserPosts({ userId, ...params }));
    }
  };

  return usePagination<IPost>(userPosts, fetchData, [userId]);
};

export default useUserPostsPagination;

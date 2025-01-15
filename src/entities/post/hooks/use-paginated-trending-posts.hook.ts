import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import { getTrendingPosts } from '@entities/post/store/slice';
import { PaginationParams } from '@app/types';
import { IPost } from '@entities/post/model/post';
import usePagination, { DataWithPaginationControl } from '@shared/hooks/use-pagination.hook';

const useTrendingPostsPagination = (): DataWithPaginationControl<IPost> => {
  const { trendingPosts } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();

  const fetchData = (params: PaginationParams): void => {
    dispatch(getTrendingPosts(params));
  };

  return usePagination<IPost>(trendingPosts, fetchData);
};

export default useTrendingPostsPagination;

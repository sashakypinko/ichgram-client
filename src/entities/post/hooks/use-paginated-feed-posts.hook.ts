import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import { getFeedPosts } from '@entities/post/store/slice';
import { PaginationParams } from '@app/types';
import { IPost } from '@entities/post/model/post';
import usePagination, { DataWithPaginationControl } from '@shared/hooks/use-pagination.hook';

const useFeedPostsPagination = (): DataWithPaginationControl<IPost> => {
  const { feedPosts } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();

  const fetchData = (params: PaginationParams): void => {
    dispatch(getFeedPosts(params));
  };

  return usePagination<IPost>(feedPosts, fetchData);
};

export default useFeedPostsPagination;

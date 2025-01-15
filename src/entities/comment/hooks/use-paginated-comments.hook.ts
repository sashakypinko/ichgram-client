import { useAppDispatch, useAppSelector } from '@app/hooks';
import { PaginationParams } from '@app/types';
import usePagination, { DataWithPaginationControl } from '@shared/hooks/use-pagination.hook';
import { IComment } from '@entities/comment/model/comment';
import { selectComment } from '@entities/comment/store/selectors';
import { getComments } from '@entities/comment/store/slice';

const usePaginatedComments = (postId?: string): DataWithPaginationControl<IComment> => {
  const { comments } = useAppSelector(selectComment);
  const dispatch = useAppDispatch();

  const fetchData = (params: PaginationParams): void => {
    if (postId) {
      dispatch(getComments({ postId, ...params }));
    }
  };

  return usePagination<IComment>(comments, fetchData, [postId]);
};

export default usePaginatedComments;

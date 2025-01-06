import { FC, useEffect } from 'react';
import { List, styled, Typography, useTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectComment } from '@entities/comment/store/selectors';
import { getComments } from '@entities/comment/store/slice';
import CommentItem from '@entities/comment/components/comment-list/comment-item';

const CommentListContainer = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

interface Props {
  postId: string;
  emptyMessage?: string;
}

const CommentList: FC<Props> = ({ postId, emptyMessage }) => {
  const { comments } = useAppSelector(selectComment);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getComments({ postId }));
  }, [postId]);

  return (
    <CommentListContainer>
      {!comments.length && emptyMessage && (
        <Typography sx={{ p: 2 }} color={theme.palette.text.secondary}>
          {emptyMessage}
        </Typography>
      )}
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </CommentListContainer>
  );
};

export default CommentList;

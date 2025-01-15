import { FC } from 'react';
import { Box, styled, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@app/hooks';
import { selectComment } from '@entities/comment/store/selectors';
import CommentItem from '@entities/comment/components/comment-list/comment-item';

const CommentListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

interface Props {
  emptyMessage?: string;
}

const CommentList: FC<Props> = ({ emptyMessage }) => {
  const { comments } = useAppSelector(selectComment);
  const theme = useTheme();

  return (
    <CommentListContainer>
      {!comments.data.length && emptyMessage && (
        <Typography sx={{ p: 2 }} color={theme.palette.text.secondary}>
          {emptyMessage}
        </Typography>
      )}
      {comments.data.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </CommentListContainer>
  );
};

export default CommentList;

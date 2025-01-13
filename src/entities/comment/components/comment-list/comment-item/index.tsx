import { FC, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { IComment } from '@entities/comment/model/comment';
import UserAvatar from '@entities/user/components/user-avatar';
import { FavoriteBorderRounded, FavoriteRounded } from '@mui/icons-material';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { useAppDispatch } from '@app/hooks';
import { removeComment, toggleCommentLike } from '@entities/comment/store/slice';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

const StyledItem = styled(Box)({
  display: 'flex',
  alignItems: 'start',
  gap: 24,
});

const CommentText = styled(Typography)({
  paddingLeft: 8,
  wordBreak: 'break-all',
  display: 'inline',
});

const CommentDate = styled(Typography)({
  color: '#737373',
});

const BoldText = styled(Typography)({
  color: '#737373',
  fontWeight: 600,
  lineHeight: 1.5,
});

const DeleteButton = styled(BoldText)({
  cursor: 'pointer',
});

interface Props {
  comment: IComment;
}

const CommentItem: FC<Props> = ({ comment }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const authUser = useAuthUser();
  const dispatch = useAppDispatch();
  const isSm = useIsBreakpoint(Breakpoint.SM);

  const toggleLike = () => {
    dispatch(toggleCommentLike(comment._id));
  };

  const handleRemoveComment = () => {
    dispatch(removeComment({
      payload: comment._id,
    }));
  };

  const ownComment = comment.author._id === authUser?._id;
  const commentDate = formatDistanceToNow(comment.createdAt);
  const liked = comment.likedBy.includes(authUser?._id || '');
  const LikeIcon = liked ? FavoriteRounded : FavoriteBorderRounded;

  return (
    <StyledItem onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <UserAvatar user={comment.author} size={42} />
      <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap={2}>
        <Box>
          <Typography component="span" fontWeight={700}>
            {comment.author.username}
          </Typography>
          <CommentText>{comment.text}</CommentText>
          <Box display="flex" gap={4} alignItems="end">
            <CommentDate variant="body2">{commentDate}</CommentDate>
            <BoldText>Likes: {comment.likedBy.length}</BoldText>
            {(hovered || isSm) && ownComment && <DeleteButton onClick={handleRemoveComment}>Delete</DeleteButton>}
          </Box>
        </Box>
        <IconButton size="small" onClick={toggleLike}>
          <LikeIcon color={liked ? 'error' : 'inherit'} fontSize="small" />
        </IconButton>
      </Box>
    </StyledItem>
  );
};

export default CommentItem;

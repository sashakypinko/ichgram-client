import { FC } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Box, IconButton, ListItem, ListItemAvatar, Typography } from '@mui/material';
import { IComment } from '@entities/comment/model/comment';
import UserAvatar from '@entities/user/components/user-avatar';
import { FavoriteBorderRounded, FavoriteRounded } from '@mui/icons-material';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { useAppDispatch } from '@app/hooks';
import { toggleCommentLike } from '@entities/comment/store/slice';

interface Props {
  comment: IComment;
}

const CommentItem: FC<Props> = ({ comment }) => {
  const authUser = useAuthUser();
  const dispatch = useAppDispatch();

  const toggleLike = () => {
    dispatch(toggleCommentLike(comment._id));
  };

  const commentDate = formatDistanceToNow(comment.createdAt);

  const liked = comment.likedBy.includes(authUser?._id || '');
  const LikeIcon = liked ? FavoriteRounded : FavoriteBorderRounded;

  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemAvatar>
        <UserAvatar user={comment.author} />
      </ListItemAvatar>
      <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography fontWeight={700}>{comment.author.username}</Typography>
          <Typography>{comment.text}</Typography>
          <Typography>{commentDate}</Typography>
          <Typography>Likes: {comment.likedBy.length}</Typography>
        </Box>
        <IconButton size="small" onClick={toggleLike}>
          <LikeIcon color={liked ? 'error' : 'inherit'} fontSize="small" />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default CommentItem;

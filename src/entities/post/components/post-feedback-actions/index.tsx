import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { IPost } from '@entities/post/model/post';
import Comment from '@shared/components/icons/comment';
import { FavoriteBorderRounded, FavoriteRounded } from '@mui/icons-material';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { useAppDispatch } from '@app/hooks';
import { togglePostLike } from '@entities/post/store/slice';

interface Props {
  post: IPost;
}

const PostFeedbackActions: FC<Props> = ({ post }) => {
  const authUser = useAuthUser();
  const dispatch = useAppDispatch();

  const toggleLike = () => {
    dispatch(togglePostLike(post._id));
  };

  const liked = post.likedBy.includes(authUser?._id || '');
  const LikeIcon = liked ? FavoriteRounded : FavoriteBorderRounded;

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <IconButton color="inherit" onClick={toggleLike}>
          <LikeIcon color={liked ? 'error' : 'inherit'} fontSize="large" />
        </IconButton>
        <IconButton color="inherit">
          <Comment />
        </IconButton>
      </Box>
      <Typography>{post.likedBy.length} likes</Typography>
    </Box>
  );
};

export default PostFeedbackActions;

import { FC } from 'react';
import { Box, Divider, styled, Typography } from '@mui/material';
import { IPost } from '@entities/post/model/post';
import { getMediumMediaUrl } from '@shared/helpers/media-helper';
import { useAppDispatch } from '@app/hooks';
import { openPostViewDialog } from '@entities/post/store/slice';
import UserAvatar from '@entities/user/components/user-avatar';
import { formatDistanceToNow } from 'date-fns';
import PostFeedbackActions from '@entities/post/components/post-feedback-actions';

const PostItemContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const Image = styled('img')({
  width: '100%',
  aspectRatio: '1/1',
  objectFit: 'cover',
  cursor: 'pointer',
});

interface Props {
  post: IPost;
}

const PostDetailedItem: FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  
  const handleOpen = () => {
    dispatch(openPostViewDialog(post));
  }

  const mediaUrl = getMediumMediaUrl(post.mediaId);
  const postDate = formatDistanceToNow(post.createdAt);
  
  return (
    <PostItemContainer>
      <Box display="flex" alignItems="center" gap={2}>
        <UserAvatar user={post.author} withUsername />
        <Typography>{postDate}</Typography>
      </Box>
      <Image src={mediaUrl} alt="post_item" onClick={handleOpen} />
      <PostFeedbackActions post={post} />
      <Typography>{post.content}</Typography>
      <Typography onClick={handleOpen} >View all comments (732)</Typography>
      <Divider />
    </PostItemContainer>
  );
};

export default PostDetailedItem;

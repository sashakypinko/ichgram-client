import { FC } from 'react';
import { Box, Divider, styled, Typography } from '@mui/material';
import { IPost } from '@entities/post/model/post';
import { getMediumMediaUrl } from '@shared/helpers/media-helper';
import { useAppDispatch } from '@app/hooks';
import { openPostViewDialog } from '@entities/post/store/slice';
import UserAvatar from '@entities/user/components/user-avatar';
import { formatDistanceToNow } from 'date-fns';
import PostFeedbackActions from '@entities/post/components/post-feedback-actions';
import { addGetParam } from '@shared/helpers/url-helper';
import { shortenString } from '@shared/helpers/string-helper.ts';

const PostItemContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const Image = styled('img')({
  width: '100%',
  aspectRatio: '1/1',
  objectFit: 'cover',
  cursor: 'pointer',
  border: '1px solid #d4d4d4',
  borderRadius: 5,
});

const PostDate = styled(Typography)({
  color: '#737373',
});

const CommentsText = styled(Typography)({
  color: '#737373',
  padding: '0 8px',
  cursor: 'pointer',
});

interface Props {
  post: IPost;
}

const PostDetailedItem: FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(openPostViewDialog(post));
    addGetParam('postId', post._id);
  };

  const mediaUrl = getMediumMediaUrl(post.mediaId);
  const postDate = formatDistanceToNow(post.createdAt);

  return (
    <PostItemContainer>
      <Box display="flex" alignItems="center" gap={2}>
        <UserAvatar user={post.author} size={42} withUsername />
        <Typography variant="h4">•</Typography>
        <PostDate variant="body2">{postDate}</PostDate>
      </Box>
      <Image src={mediaUrl} alt="post_item" onClick={handleOpen} />
      <PostFeedbackActions post={post} onCommentClick={handleOpen} />
      <Box paddingX={1} display="flex" gap={1}>
        <Typography fontWeight={600}>{post.author.username}</Typography>
        <Typography>{shortenString(post.content, 42)}</Typography>
      </Box>
      <CommentsText onClick={handleOpen}>View all comments ({post.commentsCount})</CommentsText>
      <Divider sx={{ py: 2 }}/>
    </PostItemContainer>
  );
};

export default PostDetailedItem;

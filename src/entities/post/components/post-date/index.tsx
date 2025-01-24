import { FC } from 'react';
import { styled, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { IPost } from '@entities/post/model/post';

const Date = styled(Typography)({
  color: '#737373',
});

interface Props {
  post: IPost;
}

const PostDate: FC<Props> = ({ post }) => {
  const postDate = formatDistanceToNow(post.createdAt);

  return <Date variant="body2">{postDate}.</Date>;
};

export default PostDate;

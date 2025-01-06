import { FC } from 'react';
import { Box, Grid, styled, Typography, useTheme } from '@mui/material';
import PostItem from '@entities/post/components/post-list/post-item';
import { IPost } from '@entities/post/model/post';

const PostListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

interface Props {
  posts: IPost[];
  emptyMessage?: string;
}

const PostList: FC<Props> = ({ posts, emptyMessage }) => {
  const theme = useTheme();

  return (
    <PostListContainer>
      {!posts.length && emptyMessage && (
        <Typography sx={{ p: 2 }} color={theme.palette.text.secondary}>
          {emptyMessage}
        </Typography>
      )}
      <Grid container spacing={1}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={4}>
            <PostItem post={post} />
          </Grid>
        ))}
      </Grid>
    </PostListContainer>
  );
};

export default PostList;

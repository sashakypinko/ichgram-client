import { FC } from 'react';
import { Box, Grid, styled, Typography, useTheme } from '@mui/material';
import PostItem from '@entities/post/components/post-list/post-item';
import { IPost } from '@entities/post/model/post';
import PostDetailedItem from '@entities/post/components/post-list/post-detailed-item';

const PostListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

interface Props {
  posts: IPost[];
  emptyMessage?: string;
  withDetailedItems?: boolean;
}

const PostList: FC<Props> = ({ posts, emptyMessage, withDetailedItems }) => {
  const theme = useTheme();
  
  const ItemComponent = withDetailedItems ? PostDetailedItem : PostItem;

  return (
    <PostListContainer>
      {!posts.length && emptyMessage && (
        <Typography sx={{ p: 2 }} color={theme.palette.text.secondary}>
          {emptyMessage}
        </Typography>
      )}
      <Grid container spacing={withDetailedItems ? 6 : 1}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={withDetailedItems ? 12 : 4} md={withDetailedItems ? 6 : 4}>
            <ItemComponent post={post} />
          </Grid>
        ))}
      </Grid>
    </PostListContainer>
  );
};

export default PostList;

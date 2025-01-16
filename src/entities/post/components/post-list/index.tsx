import { FC } from 'react';
import { Box, Grid, styled, Typography, useTheme } from '@mui/material';
import PostItem from '@entities/post/components/post-list/post-item';
import { IPost } from '@entities/post/model/post';
import PostDetailedItem from '@entities/post/components/post-list/post-detailed-item';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

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
  const isSm = useIsBreakpoint(Breakpoint.SM);

  const ItemComponent = withDetailedItems ? PostDetailedItem : PostItem;
  const spacing = withDetailedItems ? 4 : isSm ? 0.4 : 1;

  return (
    <PostListContainer>
      {!posts.length && emptyMessage && (
        <Typography sx={{ p: 2 }} color={theme.palette.text.secondary}>
          {emptyMessage}
        </Typography>
      )}
      <Grid container spacing={spacing}>
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

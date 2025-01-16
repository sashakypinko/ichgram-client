import { FC } from 'react';
import { Container } from '@mui/material';
import Trending from '@features/trending';
import Page from '@shared/components/page';
import { useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import CircularLoader from '@shared/components/circular-loader';
import EmptyPosts from '@entities/post/components/empty-posts';
import useTrendingPostsPagination from '@entities/post/hooks/use-paginated-trending-posts.hook';

const ExplorePage: FC = () => {
  const { fetchLoading } = useAppSelector(selectPost);
  const { data, next } = useTrendingPostsPagination();

  if (!fetchLoading && !data.length) {
    return <EmptyPosts />;
  }

  return (
    <Page onScrollBottom={next}>
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <Trending />
        {!!data.length && fetchLoading && <CircularLoader />}
      </Container>
    </Page>
  );
};

export default ExplorePage;

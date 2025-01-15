import { FC } from 'react';
import Page from '@shared/components/page';
import Feed from '@features/feed/components/feed';
import { Container } from '@mui/material';
import CircularLoader from '@shared/components/circular-loader';
import useFeedPostsPagination from '@entities/post/hooks/use-paginated-feed-posts.hook';
import { useAppSelector } from '@app/hooks.ts';
import { selectPost } from '@entities/post/store/selectors.ts';

const FeedPage: FC = () => {
  const { fetchLoading } = useAppSelector(selectPost);
  const { data, next } = useFeedPostsPagination();

  return (
    <Page onScrollBottom={next}>
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <Feed />
        {!!data.length && fetchLoading && <CircularLoader />}
      </Container>
    </Page>
  );
};

export default FeedPage;

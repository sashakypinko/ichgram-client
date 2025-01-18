import { FC } from 'react';
import { Container } from '@mui/material';
import Trending from '@features/trending';
import Page from '@shared/components/page';
import { useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import CircularLoader from '@shared/components/circular-loader';
import EmptyPosts from '@entities/post/components/empty-posts';
import useTrendingPostsPagination from '@entities/post/hooks/use-paginated-trending-posts.hook';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

const ExplorePage: FC = () => {
  const { fetchLoading } = useAppSelector(selectPost);
  const { data, next } = useTrendingPostsPagination();
  const isSm = useIsBreakpoint(Breakpoint.SM);
  
  return (
    <Page onScrollBottom={next}>
      <Container sx={{ pt: isSm ? 16: 10 }} maxWidth="lg">
        {(!fetchLoading && !data.length) && <EmptyPosts />}
        <Trending />
        {!!data.length && fetchLoading && <CircularLoader />}
      </Container>
    </Page>
  );
};

export default ExplorePage;

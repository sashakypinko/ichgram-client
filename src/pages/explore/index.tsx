import { FC, useEffect } from 'react';
import { Container } from '@mui/material';
import Trending from '@features/trending';
import Page from '@shared/components/page';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import usePagination from '@shared/hooks/use-pagination.hook';
import { getTrendingPosts } from '@entities/post/store/slice';
import CircularLoader from '@shared/components/circular-loader';

const ExplorePage: FC = () => {
  const { trendingPosts, fetchLoading } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();
  const { offset, limit, next } = usePagination(20);

  const fetchPosts = () => {
    dispatch(getTrendingPosts({ offset, limit }));
  };

  useEffect(() => {
    fetchPosts();
  }, [offset, limit]);

  return (
    <Page onScrollBottom={next}>
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <Trending />
        {!!trendingPosts.length && fetchLoading && <CircularLoader />}
      </Container>
    </Page>
  );
};

export default ExplorePage;

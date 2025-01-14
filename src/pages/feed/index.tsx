import { FC, useEffect } from 'react';
import Page from '@shared/components/page';
import Feed from '@features/feed';
import { Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { getFeedPosts } from '@entities/post/store/slice';
import usePagination from '@shared/hooks/use-pagination.hook';
import CircularLoader from '@shared/components/circular-loader';
import { selectPost } from '@entities/post/store/selectors';

const FeedPage: FC = () => {
  const { feedPosts, fetchLoading } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();
  const { offset, limit, next } = usePagination();

  const fetchPosts = () => {
    dispatch(getFeedPosts({ offset, limit }));
  };

  useEffect(() => {
    fetchPosts();
  }, [offset, limit]);

  return (
    <Page onScrollBottom={next}>
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <Feed />
        {!!feedPosts.length && fetchLoading && <CircularLoader />}
      </Container>
    </Page>
  );
};

export default FeedPage;

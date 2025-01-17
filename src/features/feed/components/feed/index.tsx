import { FC } from 'react';
import PostList from '@entities/post/components/post-list';
import { useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import EmptyFeed from '@features/feed/components/empty-feed';

const FeedPage: FC = () => {
  const { feedPosts } = useAppSelector(selectPost);

  return (
    <>
      <PostList posts={feedPosts.data} withDetailedItems />
      {feedPosts.fullyLoaded && <EmptyFeed />}
    </>
  );
};

export default FeedPage;

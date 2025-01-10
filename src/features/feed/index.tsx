import { FC } from 'react';
import PostList from '@entities/post/components/post-list';
import { useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';

const FeedPage: FC = () => {
  const { feedPosts } = useAppSelector(selectPost);
  
  return <PostList posts={feedPosts} withDetailedItems />;
};

export default FeedPage;

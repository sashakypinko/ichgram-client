import { FC } from 'react';
import PostList from '@entities/post/components/post-list';
import { useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';

const Trending: FC = () => {
  const { trendingPosts } = useAppSelector(selectPost);
  
  return <PostList posts={trendingPosts} />;
};

export default Trending;

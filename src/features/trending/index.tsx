import { FC, useEffect } from 'react';
import PostList from '@entities/post/components/post-list';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import { getTrendingPosts } from '@entities/post/store/slice';

const Trending: FC = () => {
  const { trendingPosts } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!trendingPosts.length) {
      dispatch(getTrendingPosts({}));
    }
  }, []);
  
  return <PostList posts={trendingPosts} />;
};

export default Trending;

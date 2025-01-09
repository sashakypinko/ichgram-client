import { FC, useEffect } from 'react';
import PostList from '@entities/post/components/post-list';
import { useAppDispatch, useAppSelector } from '@app/hooks.ts';
import { selectPost } from '@entities/post/store/selectors.ts';
import { getFeedPosts } from '@entities/post/store/slice.ts';

const FeedPage: FC = () => {
  const { feedPosts } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!feedPosts.length) {
      dispatch(getFeedPosts({}));
    }
  }, []);
  
  return <PostList posts={feedPosts} withDetailedItems />;
};

export default FeedPage;

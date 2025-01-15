import { FC, useEffect } from 'react';
import PostList from '@entities/post/components/post-list';
import { selectPost } from '@entities/post/store/selectors';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { getSelectedPost, openPostViewDialog } from '@entities/post/store/slice';
import { fetchGetParam } from '@shared/helpers/url-helper';
import EmptyPosts from '../../../../entities/post/components/empty-posts';

const ProfilePosts: FC = () => {
  const { userPosts, fetchLoading } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();
  const openPostId = fetchGetParam('postId');

  useEffect(() => {
    if (openPostId) {
      const post = userPosts.data.find(({ _id }) => openPostId === _id);

      if (post) {
        dispatch(openPostViewDialog(post));
      } else {
        dispatch(getSelectedPost(openPostId));
      }
    }
  }, [openPostId, userPosts]);

  if (!fetchLoading && !userPosts.data.length) {
    return <EmptyPosts />;
  }

  return <PostList posts={userPosts.data} />;
};

export default ProfilePosts;

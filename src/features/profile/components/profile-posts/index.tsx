import { FC, useEffect } from 'react';
import PostList from '@entities/post/components/post-list';
import { selectPost } from '@entities/post/store/selectors';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectUser } from '@entities/user/store/selectors';
import { getUserPosts } from '@entities/post/store/slice';

const ProfilePosts: FC = () => {
  const { selectedUser } = useAppSelector(selectUser);
  const { userPosts } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedUser) {
      dispatch(getUserPosts({ userId: selectedUser._id }));
    }
  }, [selectedUser?._id]);

  return <PostList posts={userPosts} />;
};

export default ProfilePosts;

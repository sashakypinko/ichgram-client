import { FC, useEffect } from 'react';
import PostList from '@entities/post/components/post-list';
import { selectPost } from '@entities/post/store/selectors';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectUser } from '@entities/user/store/selectors';
import { getUserPosts } from '@entities/post/store/slice';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';

const ProfilePosts: FC = () => {
  const { selectedUser } = useAppSelector(selectUser);
  const { userPosts, createLoading, updateLoading, removeLoading } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();
  const authUser = useAuthUser();

  useEffect(() => {
    if (selectedUser) {
      dispatch(getUserPosts({ userId: selectedUser._id }));
    }
  }, [selectedUser?._id]);

  useEffect(() => {
    if (selectedUser?._id && selectedUser._id === authUser?._id && !createLoading && !updateLoading && !removeLoading) {
      dispatch(getUserPosts({ userId: selectedUser._id }));
    }
  }, [createLoading, updateLoading, removeLoading]);

  return <PostList posts={userPosts} />;
};

export default ProfilePosts;

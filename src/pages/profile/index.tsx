import { FC, useEffect } from 'react';
import ProfileMainInfo from '@features/profile/components/profile-main-info';
import ProfilePosts from '@features/profile/components/profile-posts';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectUserByUsername } from '@entities/user/store/slice';
import Page from '@shared/components/page';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { Container, Divider, styled } from '@mui/material';
import { selectPost } from '@entities/post/store/selectors';
import { selectUser } from '@entities/user/store/selectors';
import CircularLoader from '@shared/components/circular-loader';
import useUserPostsPagination from '@entities/post/hooks/use-paginated-user-posts.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 64,
  padding: '64px 0',

  [theme.breakpoints.down(Breakpoint.MD)]: {
    gap: 16,
  },
}));

const ProfilePage: FC = () => {
  const { username } = useParams();
  const { fetchLoading, createLoading, updateLoading, removeLoading } = useAppSelector(selectPost);
  const { selectedUser } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const authUser = useAuthUser();
  const { data: userPosts, next, reset } = useUserPostsPagination(selectedUser?._id);

  useEffect(() => {
    if (username && authUser) {
      dispatch(selectUserByUsername(username === 'me' ? authUser.username : username));
    }
  }, [username, authUser]);

  useEffect(() => {
    if (selectedUser?._id && selectedUser._id === authUser?._id && !createLoading && !updateLoading && !removeLoading) {
      reset();
    }
  }, [createLoading, updateLoading, removeLoading]);

  return (
    <Page direction="column" onScrollBottom={next}>
      <StyledContainer maxWidth="lg">
        <ProfileMainInfo />
        <Divider />
        <ProfilePosts />
        {!!userPosts.length && fetchLoading && <CircularLoader />}
      </StyledContainer>
    </Page>
  );
};

export default ProfilePage;

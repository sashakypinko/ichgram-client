import { FC, useEffect } from 'react';
import ProfileMainInfo from '@features/profile/components/profile-main-info';
import ProfilePosts from '@features/profile/components/profile-posts';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@app/hooks';
import { selectUserByUsername } from '@entities/user/store/slice';
import Page from '@shared/components/page';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { Container } from '@mui/material';

const ProfilePage: FC = () => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const authUser = useAuthUser();

  useEffect(() => {
    if (username && authUser) {
      dispatch(selectUserByUsername(username === 'me' ? authUser.username : username));
    }
  }, [username, authUser]);

  return (
    <Page direction="column">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ProfileMainInfo />
        <ProfilePosts />
      </Container>
    </Page>
  );
};

export default ProfilePage;

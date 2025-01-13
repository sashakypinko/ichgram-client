import { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';
import UserAvatar from '@entities/user/components/user-avatar';
import { useAppSelector } from '@app/hooks';
import { selectUser } from '@entities/user/store/selectors';
import UserAbout from '@entities/user/components/user-about';
import UserWebsite from '@entities/user/components/user-website';
import Breakpoint from '@shared/enums/breakpoint.enum';
import ShowPostsAction from '@entities/user/components/user-actions/show-posts-action';
import ShowFollowersAction from '@entities/user/components/user-actions/show-followers-action';
import ShowFollowingAction from '@entities/user/components/user-actions/show-following-action';
import MessageUserAction from '@entities/user/components/user-actions/message-user-action';
import FollowUserAction from '@entities/user/components/user-actions/follow-user-action';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import EditUserAction from '@entities/user/components/user-actions/edit-user-action';

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  gap: 80,
  padding: 16,
  paddingBottom: 80,

  [theme.breakpoints.down(Breakpoint.MD)]: {
    gap: 16,
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const InfoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const InfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const ProfileMainInfo: FC = () => {
  const { selectedUser } = useAppSelector(selectUser);
  const authUser = useAuthUser();

  if (!selectedUser || !authUser) return null;

  return (
    <MainContainer>
      <UserAvatar user={selectedUser} size={150} />
      <InfoContainer>
        <InfoRow>
          <Typography marginRight={2} variant="h4" fontWeight={500}>
            {selectedUser.username}
          </Typography>
          <EditUserAction user={selectedUser} />
          <FollowUserAction user={selectedUser} />
          <MessageUserAction user={selectedUser} />
        </InfoRow>
        <InfoRow>
          <ShowPostsAction user={selectedUser} />
          <ShowFollowersAction user={selectedUser} />
          <ShowFollowingAction user={selectedUser} />
        </InfoRow>
        <Box maxWidth={500}>
          <UserAbout user={selectedUser} />
        </Box>
        <UserWebsite user={selectedUser} />
      </InfoContainer>
    </MainContainer>
  );
};

export default ProfileMainInfo;

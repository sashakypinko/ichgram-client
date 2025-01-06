import { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { IUser } from '@entities/user/model/user';
import UserAvatar from '@entities/user/components/user-avatar';
import Button from '@shared/components/button';
import PlainLink from '@shared/components/plain-link';
import { RouteEnum } from '@app/routes/enums/route.enum';
import { generatePath } from 'react-router-dom';

const UserName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

interface Props {
  user: IUser;
}

const UserInfo: FC<Props> = ({ user }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <UserAvatar user={user} size={96} direction="column" withName />
      <UserName>
        {user.fullName} • {user.username}
      </UserName>
      <PlainLink to={generatePath(RouteEnum.PROFILE, { username: user?.username || '' })}>
        <Button sx={{ mt: 2 }} variant="contained" color="secondary">
          View profile
        </Button>
      </PlainLink>
    </Box>
  );
};

export default UserInfo;

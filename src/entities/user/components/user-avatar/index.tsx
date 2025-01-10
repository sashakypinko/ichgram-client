import { FC } from 'react';
import { generatePath } from 'react-router-dom';
import { Box, styled, Typography, useTheme } from '@mui/material';
import defaultAvatar from '@assets/img/default-avatar.png';
import { IUser } from '@entities/user/model/user';
import { closeAllInteractions } from '@entities/user/store/slice';
import PlainLink from '@shared/components/plain-link';
import { RouteEnum } from '@app/routes/enums/route.enum';
import { getThumbnailMediaUrl } from '@shared/helpers/media-helper';
import { useAppDispatch } from '@app/hooks';

const AvatarContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const StyledAvatar = styled('img')({
  borderRadius: '50%',
  border: '1px solid rgba(0, 0, 0, 0.10)',
});

interface Props {
  user: IUser | null;
  size?: number;
  withName?: boolean;
  withUsername?: boolean;
  withoutLink?: boolean;
  direction?: 'row' | 'column';
}

const UserAvatar: FC<Props> = ({
  user,
  size = 26,
  withName = false,
  withUsername = false,
  direction = 'row',
  withoutLink,
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  
  const handleAvatarClick = () => {
   dispatch(closeAllInteractions());
  };

  const avatarUrl = user?.avatar ? getThumbnailMediaUrl(user?.avatar) : defaultAvatar;
  const Avatar = () => <StyledAvatar style={{ width: size, height: size }} src={avatarUrl} alt="avatar" />;

  return (
    <AvatarContainer flexDirection={direction}>
      {withoutLink ? (
        <Avatar />
      ) : (
        <PlainLink
          to={generatePath(RouteEnum.PROFILE, { username: user?.username || '' })}
          onClick={handleAvatarClick}
        >
          <Avatar />
        </PlainLink>
      )}
      {withName && <Typography variant="h5">{user?.fullName}</Typography>}
      {withUsername && (
        <Typography color={theme.palette.text[withName ? 'secondary' : 'primary']}>{user?.username}</Typography>
      )}
    </AvatarContainer>
  );
};

export default UserAvatar;

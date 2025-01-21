import { FC } from 'react';
import { Container, styled, Typography } from '@mui/material';
import PlainLink from '@shared/components/plain-link';
import { RouteEnum } from '@app/routes/enums/route.enum';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';
import useUserOverlay from '@entities/user/hooks/use-user-overlay.hook';
import useNotificationOverlay from '@entities/notification/hooks/use-notification-overlay.hook';
import { useAppDispatch } from '@app/hooks';
import { openPostFormDialog } from '@entities/post/store/slice';

const LinksContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 32,
  padding: '16px 0',

  '& > a,p': {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  },
}));

const Footer: FC = () => {
  const authUser = useAuthUser();
  const isMd = useIsBreakpoint(Breakpoint.MD);
  const { show: showUserOverlay } = useUserOverlay();
  const { show: showNotificationOverlay } = useNotificationOverlay();
  const dispatch = useAppDispatch();

  if (isMd || !authUser) {
    return null;
  }

  return (
    <Container sx={{ py: 3 }} maxWidth="lg">
      <LinksContainer>
        <PlainLink to={RouteEnum.MAIN}>Home</PlainLink>
        <Typography onClick={showUserOverlay}>Search</Typography>
        <PlainLink to={RouteEnum.EXPLORE}>Explore</PlainLink>
        <PlainLink to={RouteEnum.DIRECT}>Messages</PlainLink>
        <Typography onClick={showNotificationOverlay}>Notifications</Typography>
        <Typography onClick={() => dispatch(openPostFormDialog())}>Create</Typography>
      </LinksContainer>
      <LinksContainer>
        <PlainLink to={RouteEnum.MAIN}>© 2024 ICHgram</PlainLink>
      </LinksContainer>
    </Container>
  );
};

export default Footer;

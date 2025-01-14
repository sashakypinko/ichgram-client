import { FC } from 'react';
import { Badge, Box, IconButton, styled } from '@mui/material';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';
import { Like, Message } from '@shared/components/icons';
import useUnreadNotificationsCount from '@entities/notification/hooks/use-unread-notifications-count.hook';
import useUnreadMessagesCount from '@entities/conversation/hooks/use-unread-messages-count.hook';
import { RouteEnum } from '@app/routes/enums/route.enum';
import PlainLink from '@shared/components/plain-link';
import logo from '@assets/img/logo.svg';
import useNotificationOverlay from '@entities/notification/hooks/use-notification-overlay.hook';

const HeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid',
  borderColor: theme.palette.text.disabled,
  background: theme.palette.background.default,
  zIndex: 100,
  padding: 8,
}));

const Actions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

const Logo = styled('img')({
  maxWidth: '96px',
  margin: '0 12px',
});

const MobileHeader: FC = () => {
  const isSm = useIsBreakpoint(Breakpoint.SM);
  const unreadNotificationsCount = useUnreadNotificationsCount();
  const unreadMessagesCount = useUnreadMessagesCount();
  const { show: showNotificationOverlay } = useNotificationOverlay();

  if (!isSm) return null;

  return (
    <HeaderContainer>
      <PlainLink to={RouteEnum.MAIN}>
        <Logo src={logo} alt="logo" />
      </PlainLink>
      <Actions>
        <IconButton onClick={showNotificationOverlay}>
          <Badge badgeContent={unreadNotificationsCount} color="error">
            <Like />
          </Badge>
        </IconButton>
        <PlainLink to={RouteEnum.DIRECT}>
          <IconButton>
            <Badge badgeContent={unreadMessagesCount} color="error">
              <Message />
            </Badge>
          </IconButton>
        </PlainLink>
      </Actions>
    </HeaderContainer>
  );
};

export default MobileHeader;

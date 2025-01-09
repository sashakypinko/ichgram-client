import { FC, useMemo } from 'react';
import { Badge, Box, List, styled } from '@mui/material';
import { RouteEnum } from '@app/routes/enums/route.enum';
import { Home, Search, Compass, Message, Like, Plus } from '@shared/components/icons';
import { IconProps } from '@shared/components/icons/icon';
import UserAvatar from '@entities/user/components/user-avatar';
import SidebarItem from './sidebar-item';
import logo from '@assets/img/logo.svg';
import { matchRoute } from '@shared/helpers/url-helper';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import useUserOverlay from '@entities/user/hooks/use-user-overlay.hook';
import useNotificationOverlay from '@entities/notification/hooks/use-notification-overlay.hook';
import useUnreadMessagesCount from '@entities/conversation/hooks/use-unread-messages-count.hook';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import { openPostFormDialog } from '@entities/post/store/slice';
import useUnreadNotificationsCount from '@entities/notification/hooks/use-unread-notifications-count.hook';

const SidebarContainer = styled(Box)(({ theme }) => ({
  minWidth: 240,
  padding: 16,
  background: theme.palette.background.default,
  borderRight: `1px solid ${theme.palette.text.disabled}`,

  [theme.breakpoints.down(Breakpoint.LG)]: {
    minWidth: 'auto',
  },

  [theme.breakpoints.down(Breakpoint.SM)]: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 0,
    borderTop: `1px solid ${theme.palette.text.disabled}`,
    zIndex: 9999,
  },
}));

const Logo = styled('img')({
  maxWidth: '96px',
  margin: '0 12px',
});

export interface SidebarLinkProps {
  label: string;
  active: boolean;
  link?: string;
  hidden?: boolean;
  onClick?: () => void;
  Icon: FC<IconProps>;
}

const Sidebar: FC = () => {
  const authUser = useAuthUser();
  const unreadMessagesCount = useUnreadMessagesCount();
  const unreadNotificationsCount = useUnreadNotificationsCount();
  const { opened: userOverlayOpened, show: showUserOverlay } = useUserOverlay();
  const { opened: notificationOverlayOpened, show: showNotificationOverlay } = useNotificationOverlay();
  const { postFormDialogOpened } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isSm = useIsBreakpoint(Breakpoint.SM);
  const isLg = useIsBreakpoint(Breakpoint.LG);

  const overlayOpened = userOverlayOpened || notificationOverlayOpened || postFormDialogOpened;

  const sidebarLinks: SidebarLinkProps[] = useMemo(
    () => [
      {
        label: 'Home',
        link: RouteEnum.MAIN,
        active: !overlayOpened && matchRoute(RouteEnum.MAIN),
        Icon: Home,
      },
      {
        label: 'Search',
        active: userOverlayOpened,
        onClick: showUserOverlay,
        Icon: Search,
      },
      {
        label: 'Explore',
        link: RouteEnum.EXPLORE,
        active: !overlayOpened && matchRoute(RouteEnum.EXPLORE),
        Icon: Compass,
      },
      {
        label: 'Messages',
        link: RouteEnum.DIRECT,
        active: !overlayOpened && matchRoute(RouteEnum.DIRECT),
        hidden: isSm,
        Icon: (props) => (
          <Badge badgeContent={unreadMessagesCount} color="error">
            <Message {...props} />
          </Badge>
        ),
      },
      {
        label: 'Notifications',
        active: notificationOverlayOpened,
        onClick: showNotificationOverlay,
        hidden: isSm,
        Icon: (props) => (
          <Badge badgeContent={unreadNotificationsCount} color="error">
            <Like {...props} />
          </Badge>
        ),
      },
      {
        label: 'Create',
        active: postFormDialogOpened,
        onClick: () => dispatch(openPostFormDialog()),
        Icon: Plus,
      },
      {
        label: 'Profile',
        link: RouteEnum.OWN_PROFILE,
        active: !overlayOpened && matchRoute(RouteEnum.OWN_PROFILE),
        Icon: () => <UserAvatar user={authUser} withoutLink />,
      },
    ],
    [location, overlayOpened, isSm, unreadNotificationsCount, unreadMessagesCount, postFormDialogOpened],
  );

  if (!authUser) return null;

  return (
    <SidebarContainer>
      {!isLg && <Logo src={logo} alt="logo" />}
      <List sx={{ display: 'flex', flexDirection: isSm ? 'row' : 'column' }}>
        {sidebarLinks.map((linkProps, index) => (
          <SidebarItem key={index} {...linkProps} />
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;

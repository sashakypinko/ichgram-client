import { FC } from 'react';
import { ListItem } from '@mui/material';
import { SidebarLinkProps } from '../index';
import SidebarLink from './sidebar-link';
import SidebarButton from '@shared/components/sidebar/sidebar-item/sidebar-button';
import useUserOverlay from '@entities/user/hooks/use-user-overlay.hook';
import useNotificationOverlay from '@entities/notification/hooks/use-notification-overlay.hook';

const SidebarItem: FC<SidebarLinkProps> = ({ label, link, Icon, active, hidden, onClick }) => {
  const { hide: hideUserOverlay } = useUserOverlay();
  const { hide: hideNotificationOverlay } = useNotificationOverlay();

  const hideAllOverlays = () => {
    hideUserOverlay();
    hideNotificationOverlay();
  };

  if (hidden) return null;

  const Button = (
    <SidebarButton
      label={label}
      Icon={Icon}
      isActive={active}
      onClick={() => {
        hideAllOverlays();
        onClick && onClick();
      }}
    />
  );

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      {link ? (
        <SidebarLink to={link} onClick={hideAllOverlays}>
          {Button}
        </SidebarLink>
      ) : (
        Button
      )}
    </ListItem>
  );
};

export default SidebarItem;

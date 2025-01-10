import { FC, useEffect } from 'react';
import OverlayPanel from '@shared/components/overlay-panel';
import useNotificationOverlay from '@entities/notification/hooks/use-notification-overlay.hook';
import NotificationList from '@entities/notification/components/notification-list';
import { useLocation } from 'react-router-dom';

const NotificationOverlayPanel: FC = () => {
  const { opened, hide } = useNotificationOverlay();
  const location = useLocation();

  useEffect(() => {
    hide();
  }, [location]);

  return (
    <OverlayPanel opened={opened} title="Notification" onClose={hide}>
      <NotificationList emptyMessage="You don't have any notifications yet."/>
    </OverlayPanel>
  );
};

export default NotificationOverlayPanel;

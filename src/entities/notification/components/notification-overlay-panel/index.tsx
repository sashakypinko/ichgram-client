import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OverlayPanel from '@shared/components/overlay-panel';
import useNotificationOverlay from '@entities/notification/hooks/use-notification-overlay.hook';
import NotificationList from '@entities/notification/components/notification-list';
import usePaginatedNotifications from '@entities/notification/hooks/use-paginated-notifications.hook';

const NotificationOverlayPanel: FC = () => {
  const { opened, hide } = useNotificationOverlay();
  const location = useLocation();
  const { next } = usePaginatedNotifications();

  useEffect(() => {
    hide();
  }, [location]);

  return (
    <OverlayPanel opened={opened} title="Notification" onClose={hide} onScrollBottom={next}>
      <NotificationList emptyMessage="You don't have any notifications yet." />
    </OverlayPanel>
  );
};

export default NotificationOverlayPanel;

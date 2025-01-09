import { FC } from 'react';
import OverlayPanel from '@shared/components/overlay-panel';
import useNotificationOverlay from '@entities/notification/hooks/use-notification-overlay.hook';
import NotificationList from '@entities/notification/components/notification-list';

const NotificationOverlayPanel: FC = () => {
  const { opened, hide } = useNotificationOverlay();

  return (
    <OverlayPanel opened={opened} title="Notification" onClose={hide}>
      <NotificationList emptyMessage="You don't have any notifications yet."/>
    </OverlayPanel>
  );
};

export default NotificationOverlayPanel;

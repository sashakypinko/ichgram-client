import { FC } from 'react';
import OverlayPanel from '@shared/components/overlay-panel';
import { Box } from '@mui/material';
import useNotificationOverlay from '@entities/notification/hooks/use-notification-overlay.hook';

const NotificationOverlayPanel: FC = () => {
  const { opened, hide } = useNotificationOverlay();

  return (
    <OverlayPanel opened={opened} title="Notification" onClose={hide}>
      <Box />
    </OverlayPanel>
  );
};

export default NotificationOverlayPanel;

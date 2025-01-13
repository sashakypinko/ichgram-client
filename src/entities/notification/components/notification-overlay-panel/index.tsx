import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OverlayPanel from '@shared/components/overlay-panel';
import useNotificationOverlay from '@entities/notification/hooks/use-notification-overlay.hook';
import NotificationList from '@entities/notification/components/notification-list';
import usePagination from '@shared/hooks/use-pagination.hook';
import { useAppDispatch } from '@app/hooks';
import { getNotifications } from '@entities/notification/store/slice';

const NotificationOverlayPanel: FC = () => {
  const { opened, hide } = useNotificationOverlay();
  const location = useLocation();
  const { offset, limit, next, reset } = usePagination(50);
  const dispatch = useAppDispatch();

  const fetchNotifications = () => {
    dispatch(getNotifications({ offset, limit }));
  };

  useEffect(() => {
    fetchNotifications();
  }, [offset, limit]);

  useEffect(() => {
    hide();
  }, [location]);

  useEffect(() => {
    if (!opened) {
      reset();
    }
  }, [opened]);

  return (
    <OverlayPanel opened={opened} title="Notification" onClose={hide} onScrollBottom={next}>
      <NotificationList emptyMessage="You don't have any notifications yet."/>
    </OverlayPanel>
  );
};

export default NotificationOverlayPanel;

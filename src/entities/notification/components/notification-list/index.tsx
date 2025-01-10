import { FC, useEffect } from 'react';
import { List, styled, Typography, useTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectNotification } from '@entities/notification/store/selectors';
import NotificationItem from '@entities/notification/components/notification-list/notification-item';
import useNotificationOverlay from '@entities/notification/hooks/use-notification-overlay.hook';
import { markAllNotificationsAsViewed } from '@entities/notification/store/slice';

const ListContainer = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

interface Props {
  emptyMessage?: string;
}

const NotificationList: FC<Props> = ({ emptyMessage }) => {
  const { opened } = useNotificationOverlay();
  const { notifications } = useAppSelector(selectNotification);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (notifications.length && !opened) {
      dispatch(markAllNotificationsAsViewed());
    }
  }, [opened]);
  
  return (
    <ListContainer>
      {!notifications.length && emptyMessage && (
        <Typography sx={{ p: 2 }} color={theme.palette.text.secondary}>
          {emptyMessage}
        </Typography>
      )} 
      {notifications.map((notification) => (
        <NotificationItem
          key={notification._id}
          notification={notification}
        />
      ))}
    </ListContainer>
  );
};

export default NotificationList;

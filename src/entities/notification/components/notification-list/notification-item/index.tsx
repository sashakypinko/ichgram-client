import { FC } from 'react';
import { Box, ListItem, ListItemAvatar, ListItemButton, Typography } from '@mui/material';
import UserAvatar from '@entities/user/components/user-avatar';
import { INotification } from '@entities/notification/model/notification';
import { formatDistanceToNow } from 'date-fns';
import MediaView from '@shared/components/media-view';
import { Size } from '@shared/enums/size.enum';
import { NotificationAction } from '@entities/notification/enums';
import FollowUserAction from '@entities/user/components/user-actions/follow-user-action';

interface Props {
  notification: INotification;
}

const NotificationItem: FC<Props> = ({ notification }) => {
  const notificationDate = formatDistanceToNow(notification.createdAt, { addSuffix: true });
  
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton sx={{ borderRadius: 2, background: notification.viewed ? 'none' : '#ececec' }}>
        <ListItemAvatar>
          <UserAvatar user={notification.sender} size={42} />
        </ListItemAvatar>
        <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography fontWeight={700} component="span">
              {notification.sender.username}
            </Typography>
            <Typography component="span"> {notification.action} your photo</Typography>
            <Typography>{notificationDate}</Typography>
          </Box>
          {notification.mediaId && <MediaView mediaId={notification.mediaId} size={Size.THUMBNAIL} />}
          {notification.action === NotificationAction.FOLLOW && <FollowUserAction user={notification.sender} />}
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default NotificationItem;

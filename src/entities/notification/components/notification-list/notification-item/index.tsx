import { FC } from 'react';
import { Box, ListItem, ListItemAvatar, ListItemButton, Typography, useTheme } from '@mui/material';
import UserAvatar from '@entities/user/components/user-avatar';
import { INotification } from '@entities/notification/model/notification';
import { formatDistanceToNow } from 'date-fns';
import MediaView from '@shared/components/media-view';
import { Size } from '@shared/enums/size.enum';
import { NotificationAction, NotificationEntityType } from '@entities/notification/enums';
import FollowUserAction from '@entities/user/components/user-actions/follow-user-action';
import { useNavigate } from 'react-router-dom';
import { RouteEnum } from '@app/routes/enums/route.enum';
import { getNotificationText } from '@entities/notification/helpers';

interface Props {
  notification: INotification;
}

const NotificationItem: FC<Props> = ({ notification }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const handleClick = () => {
    if ([NotificationEntityType.POST, NotificationEntityType.COMMENT].includes(notification.entityType)) {
      navigate(`${RouteEnum.OWN_PROFILE}?postId=${notification.entityId}`);
    }
  };
  
  const notificationDate = formatDistanceToNow(notification.createdAt, { addSuffix: true });
  
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton 
        sx={{ borderRadius: 2, background: notification.viewed ? 'none' : '#ececec' }}
        onClick={handleClick}
      >
        <ListItemAvatar>
          <UserAvatar user={notification.sender} size={42} />
        </ListItemAvatar>
        <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap={2}>
          <Box>
            <Typography fontWeight={700} component="span">
              {notification.sender.username}
            </Typography>
            <Typography component="span"> {getNotificationText(notification.entityType, notification.action)}</Typography>
            <Typography color={theme.palette.text.secondary} component="span"> {notificationDate}</Typography>
          </Box>
          {notification.mediaId && <MediaView mediaId={notification.mediaId} size={Size.THUMBNAIL} withFullView={false} />}
          {notification.action === NotificationAction.FOLLOW && <FollowUserAction user={notification.sender} />}
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default NotificationItem;

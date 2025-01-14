import { NotificationAction, NotificationEntityType } from '@entities/notification/enums';

type NotificationMappingKey = `${NotificationEntityType}-${NotificationAction}`;

export const getNotificationText = (entity: NotificationEntityType, action: NotificationAction): string => {
  const mapping: Partial<Record<NotificationMappingKey, string>> = {
    'post-like': 'liked your post',
    'post-comment': 'commented your post',
    'comment-like': 'liked your comment',
    'user-follow': 'started following you',
  };

  return mapping[`${entity}-${action}`] || '';
};

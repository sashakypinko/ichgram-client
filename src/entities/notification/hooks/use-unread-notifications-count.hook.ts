import { useAppSelector } from '@app/hooks';
import { selectNotification } from '@entities/notification/store/selectors';

const useUnreadNotificationsCount = (): number => {
  const { notifications } = useAppSelector(selectNotification);

  return notifications.data.filter(({ viewed }) => !viewed).length;
};

export default useUnreadNotificationsCount;

import useOverlay from '@shared/hooks/use-overlay.hook';
import { RootState } from '@app/store';
import { setOpenedNotificationOverlay } from '@entities/notification/store/slice';

const useNotificationOverlay = () => {
  return useOverlay(setOpenedNotificationOverlay, (state: RootState) => state.notification.openedOverlay);
};

export default useNotificationOverlay;

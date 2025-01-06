import useOverlay from '@shared/hooks/use-overlay.hook';
import { setOpenedUserOverlay } from '@entities/user/store/slice';
import { RootState } from '@app/store';

const useUserOverlay = () => {
  return useOverlay(setOpenedUserOverlay, (state: RootState) => state.user.openedOverlay);
};

export default useUserOverlay;

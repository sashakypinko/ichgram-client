import { useAppDispatch, useAppSelector } from '@app/hooks';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { RootState } from '@app/store';

interface Overlay {
  opened: boolean;
  show: () => void;
  hide: () => void;
}

const useOverlay = (
  actionCreator: ActionCreatorWithPayload<boolean>,
  stateSelector: (state: RootState) => boolean,
): Overlay => {
  const opened: boolean = useAppSelector(stateSelector);
  const dispatch = useAppDispatch();

  const setOpened = (newValue: boolean) => {
    dispatch(actionCreator(newValue));
  };

  return {
    opened,
    show: () => {
      setOpened(true);
    },
    hide: () => {
      setOpened(false);
    },
  };
};

export default useOverlay;

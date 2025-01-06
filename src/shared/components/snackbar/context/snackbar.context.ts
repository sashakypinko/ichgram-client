import { createContext } from 'react';
import { SnackbarContextProps } from '../types';

const SnackbarContext = createContext<SnackbarContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  successSnackbar: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  errorSnackbar: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  warningSnackbar: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  infoSnackbar: () => {},
});

export default SnackbarContext;

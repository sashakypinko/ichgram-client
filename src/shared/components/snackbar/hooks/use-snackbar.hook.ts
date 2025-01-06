import { useContext } from 'react';
import SnackbarContext from '../context/snackbar.context';
import { SnackbarContextProps } from '../types';

const useSnackbar = (): SnackbarContextProps => {
  return useContext(SnackbarContext);
};

export default useSnackbar;

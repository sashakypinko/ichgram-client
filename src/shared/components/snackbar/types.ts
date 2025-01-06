export type SnackbarType = (message: string) => void;

export interface SnackbarContextProps {
  successSnackbar: SnackbarType;
  errorSnackbar: SnackbarType;
  warningSnackbar: SnackbarType;
  infoSnackbar: SnackbarType;
}

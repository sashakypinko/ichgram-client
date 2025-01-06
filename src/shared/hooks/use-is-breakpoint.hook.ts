import Breakpoint from '@shared/enums/breakpoint.enum';
import { useMediaQuery, useTheme } from '@mui/material';

const useIsBreakpoint = (breakpoint: Breakpoint): boolean => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down(breakpoint));
};

export default useIsBreakpoint;

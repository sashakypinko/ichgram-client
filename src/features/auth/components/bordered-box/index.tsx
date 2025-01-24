import { FC, ReactNode } from 'react';
import { Box, styled } from '@mui/material';
import Breakpoint from '@shared/enums/breakpoint.enum';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px 40px',
  borderRadius: 1,
  border: '1px solid #DBDBDB',
  gap: 16,

  [theme.breakpoints.down(Breakpoint.MD)]: {
    padding: '12px 20px',
  },
}));

interface Props {
  children: ReactNode;
}

const BorderedBox: FC<Props> = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default BorderedBox;

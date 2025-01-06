import { Box, styled } from '@mui/material';
import { FC, ReactNode } from 'react';
import Breakpoint from '@shared/enums/breakpoint.enum';

const StyledPage = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',

  [theme.breakpoints.down(Breakpoint.SM)]: {
    height: 'calc(100% - 64px)',
  },
}));

interface Props {
  direction?: 'row' | 'column';
  children: ReactNode;
}

const Page: FC<Props> = ({ direction = 'row', children }) => {
  return <StyledPage flexDirection={direction}>{children}</StyledPage>;
};

export default Page;

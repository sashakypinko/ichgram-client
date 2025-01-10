import { Box, styled } from '@mui/material';
import { FC, ReactNode, useRef } from 'react';
import Breakpoint from '@shared/enums/breakpoint.enum';

const StyledPage = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  overflowY: 'scroll',

  [theme.breakpoints.down(Breakpoint.SM)]: {
    height: 'calc(100% - 64px)',
  },
}));

interface Props {
  direction?: 'row' | 'column';
  onScrollBottom?: () => void;
  children: ReactNode;
}

const Page: FC<Props> = ({ direction = 'row', onScrollBottom, children }) => {
  const pageRef = useRef<HTMLDivElement>();

  const handleScroll = () => {
    if (
      onScrollBottom &&
      pageRef.current &&
      pageRef.current.scrollTop + pageRef.current.clientHeight === pageRef.current.scrollHeight
    ) {
      onScrollBottom();
    }
  };

  return (
    <StyledPage ref={pageRef} onScroll={handleScroll} flexDirection={direction}>
      {children}
    </StyledPage>
  );
};

export default Page;

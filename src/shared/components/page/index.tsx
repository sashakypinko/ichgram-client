import { Box, styled } from '@mui/material';
import { FC, ReactNode, useRef } from 'react';
import Breakpoint from '@shared/enums/breakpoint.enum';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';

const StyledPage = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '100%',
  overflowY: 'auto',
});

interface Props {
  direction?: 'row' | 'column';
  onScrollBottom?: () => void;
  paddingTop?: number;
  hasNavbar?: boolean;
  children: ReactNode;
}

const Page: FC<Props> = ({ direction = 'row', onScrollBottom, paddingTop = 0, hasNavbar = true, children }) => {
  const pageRef = useRef<HTMLDivElement>();
  const isSm = useIsBreakpoint(Breakpoint.SM);

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
    <StyledPage 
      sx={{ paddingTop, height: `calc(100% - ${(hasNavbar && isSm) ? '64px' : '0px'})` }} 
      ref={pageRef} 
      onScroll={handleScroll} 
      flexDirection={direction}
    >
      {children}
    </StyledPage>
  );
};

export default Page;

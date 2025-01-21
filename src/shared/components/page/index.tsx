import { Box, styled } from '@mui/material';
import { FC, ReactNode, useRef } from 'react';
import Breakpoint from '@shared/enums/breakpoint.enum';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Footer from '@shared/components/footer';

const StyledPage = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  overflowY: 'auto',

  [theme.breakpoints.down(Breakpoint.MD)]: {
    flexDirection: 'row',
  },
}));

interface Props {
  onScrollBottom?: () => void;
  paddingTop?: number;
  hasNavbar?: boolean;
  hideFooter?: boolean;
  children: ReactNode;
}

const Page: FC<Props> = ({ onScrollBottom, paddingTop = 0, hasNavbar = true, hideFooter, children }) => {
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
      sx={{ paddingTop, height: `calc(100% - ${hasNavbar && isSm ? '64px' : '0px'})` }}
      ref={pageRef}
      onScroll={handleScroll}
    >
      {children}
      {!hideFooter && <Footer />}
    </StyledPage>
  );
};

export default Page;

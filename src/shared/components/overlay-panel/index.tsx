import { FC, ReactNode, MouseEvent, useRef, useEffect } from 'react';
import { Box, Fade, Paper, styled, Typography } from '@mui/material';
import Breakpoint from '@shared/enums/breakpoint.enum';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import BackButton from '@shared/components/back-button';

const Backdrop = styled(Box)({
  position: 'absolute',
  background: 'rgba(0,0,0,0.42)',
  zIndex: 999,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const Panel = styled(Paper)(({ theme }) => ({
  background: '#fff',
  height: '100%',
  maxWidth: 460,
  borderRadius: '0 16px 16px 0',
  overflowY: 'auto',

  [theme.breakpoints.down(Breakpoint.SM)]: {
    maxWidth: '100%',
    borderRadius: 0,
  },
}));

const Header = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 16,
});

const Content = styled(Box)({
  padding: '0 16px',
});

interface Props {
  title: string;
  opened: boolean;
  onClose: () => void;
  onScrollBottom?: () => void;
  children: ReactNode;
}

const OverlayPanel: FC<Props> = ({ opened, onClose, title, onScrollBottom, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const isSm = useIsBreakpoint(Breakpoint.SM);

  const handleScroll = () => {
    if (
      onScrollBottom &&
      panelRef.current &&
      panelRef.current.scrollTop + panelRef.current.clientHeight === panelRef.current.scrollHeight
    ) {
      onScrollBottom();
    }
  };

  const handleClose = (e: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (!opened && panelRef.current) {
      panelRef.current.scrollTop = 0;
    }
  }, [opened]);

  return (
    <Fade in={opened} timeout={300}>
      <Backdrop onClick={handleClose}>
        <Panel ref={panelRef} onScroll={handleScroll} elevation={isSm ? 0 : 2}>
          <Header>
            <BackButton onClick={onClose} />
            <Typography variant="h3">{title}</Typography>
          </Header>
          <Content>{children}</Content>
        </Panel>
      </Backdrop>
    </Fade>
  );
};

export default OverlayPanel;

import { FC, ReactNode, MouseEvent, useRef } from 'react';
import { Box, Fade, Paper, styled, Typography } from '@mui/material';
import Breakpoint from '@shared/enums/breakpoint.enum';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';

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
  padding: 16,
  background: '#fff',
  height: '100%',
  maxWidth: 420,
  borderRadius: '0 16px 16px 0',

  [theme.breakpoints.down(Breakpoint.SM)]: {
    maxWidth: '100%',
    borderRadius: 0,
  },
}));

interface Props {
  title: string;
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
}

const OverlayPanel: FC<Props> = ({ opened, onClose, title, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const isSm = useIsBreakpoint(Breakpoint.SM);

  const handleClose = (e: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <Fade in={opened} timeout={300}>
      <Backdrop onClick={handleClose}>
        <Panel ref={panelRef} elevation={isSm ? 0 : 2}>
          <Typography variant="h3">{title}</Typography>
          {children}
        </Panel>
      </Backdrop>
    </Fade>
  );
};

export default OverlayPanel;

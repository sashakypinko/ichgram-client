import { FC, ReactNode } from 'react';
import { Box, Dialog as MuiDialog, styled, Typography } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import Breakpoint from '@shared/enums/breakpoint.enum';

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
  },

  [theme.breakpoints.down(Breakpoint.SM)]: {
    maxHeight: 'calc(100% - 40px)',
  },
}));

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

const CloseButton = styled(CloseRounded)({
  cursor: 'pointer',
});

interface Props {
  open: boolean;
  title: string;
  minHeight?: string | number;
  maxWidth?: Breakpoint;
  onClose: () => void;
  children: ReactNode;
}

const Dialog: FC<Props> = ({ open, title, minHeight, maxWidth, onClose, children }) => {
  return (
    <StyledDialog
      PaperProps={{
        sx: { minHeight },
      }}
      maxWidth={maxWidth}
      onClose={onClose}
      open={open}
      fullWidth
    >
      <Header>
        <Box sx={{ p: 2 }} />
        <Typography variant="h5">{title}</Typography>
        <CloseButton fontSize="large" onClick={onClose} />
      </Header>
      {children}
    </StyledDialog>
  );
};

export default Dialog;

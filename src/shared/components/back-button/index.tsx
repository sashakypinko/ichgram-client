import type { FC } from 'react';
import { IconButton } from '@mui/material';
import { KeyboardBackspaceRounded } from '@mui/icons-material';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const BackButton: FC<Props> = ({ onClick, disabled }) => {
  return (
    <IconButton color="inherit" onClick={onClick} disabled={disabled}>
      <KeyboardBackspaceRounded fontSize="large" />
    </IconButton>
  );
};

export default BackButton;

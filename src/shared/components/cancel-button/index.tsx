import { FC } from 'react';
import { IconButton, styled } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

const StyledButton = styled(IconButton)({
  padding: 1,
  background: '#f0f0f0',
  border: '1px solid #d1d1d1',

  '&:hover': {
    background: '#dcdcdc',
  },

  '&:active': {
    background: '#afafaf',
  },
});

interface Props {
  onClick: () => void;
}

const CancelButton: FC<Props> = ({ onClick }) => {
  return (
    <StyledButton size="small" color="inherit" onClick={onClick}>
      <CloseRounded fontSize="small" />
    </StyledButton>
  );
};

export default CancelButton;

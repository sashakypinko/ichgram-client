import type { ReactElement } from 'react';
import { styled, TextField as MuiTextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: 8,
    background: theme.palette.background.paper,
    border: '1px solid',
    borderColor: theme.palette.text.disabled,

    '& fieldset': {
      border: 'none',
    },

    '& input': {
      fontSize: 12,
      fontWeight: 500,
      padding: 12,
    },
  },
}));

const Input = (props: TextFieldProps): ReactElement => {
  return <StyledTextField {...props} />;
};

export default Input;

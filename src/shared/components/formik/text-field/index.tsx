import type { ReactElement } from 'react';
import { styled, TextField as MuiTextField } from '@mui/material';
import { useField } from 'formik';
import { BaseTextFieldProps } from '@mui/material/TextField/TextField';

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: 3,
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

interface Props extends BaseTextFieldProps {
  name: string;
}

const TextField = ({ name, ...props }: Props): ReactElement => {
  const [field, meta] = useField<string>(name);

  return (
    <StyledTextField
      {...props}
      name={name}
      value={field.value}
      helperText={meta.error && meta.touched ? meta.error : ''}
      error={!!(meta.error && meta.touched)}
      onChange={field.onChange}
      onBlur={field.onBlur}
    />
  );
};

export default TextField;

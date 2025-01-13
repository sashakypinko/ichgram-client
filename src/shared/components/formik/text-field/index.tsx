import type { ChangeEvent, ReactElement } from 'react';
import { Box, styled, TextField as MuiTextField, Typography } from '@mui/material';
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

const SymbolCount = styled(Typography)({
  color: '#C7C7C7',
  position: 'absolute',
  right: 12,
  bottom: 6,
});

interface Props extends BaseTextFieldProps {
  name: string;
  maxLength?: number;
}

const TextField = ({ name, maxLength, ...props }: Props): ReactElement => {
  const [field, meta] = useField<string>(name);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value.length >= maxLength) {
      return;
    }
    
    field.onChange(e);
  }

  const valueLength = field.value.length;

  return (
    <Box position="relative">
      <StyledTextField
        {...props}
        name={name}
        value={field.value}
        helperText={meta.error && meta.touched ? meta.error : ''}
        error={!!(meta.error && meta.touched)}
        onChange={handleChange}
        onBlur={field.onBlur}
      />
      {maxLength && (
        <SymbolCount variant="body2">
          {valueLength}/{maxLength}
        </SymbolCount>
      )}
    </Box>
  );
};

export default TextField;

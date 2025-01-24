import { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import { StandardTextFieldProps } from '@mui/material/TextField/TextField';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import TextField from '@shared/components/formik/text-field';

interface Props extends StandardTextFieldProps {
  name: string;
}

const PasswordField: FC<Props> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        sx: { p: 0 },
        endAdornment: (
          <IconButton onClick={handleClickShowPassword}>
            {showPassword ? <VisibilityRounded /> : <VisibilityOffRounded />}
          </IconButton>
        ),
      }}
    />
  );
};

export default PasswordField;

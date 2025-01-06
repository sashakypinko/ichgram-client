import { FC } from 'react';
import AuthFormContainer from '../auth-form-container';
import PasswordRecoveryForm from '@features/auth/components/password-recovery-form';
import { RouteEnum } from '@app/routes/enums/route.enum';
import OrDivider from '@shared/components/or-divider';
import { styled, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import lockImg from '@assets/img/lock.svg';

const CreateAccountLink = styled(Link)({
  textDecoration: 'none',
  color: '#000000',
  fontWeight: 600,
});

const PasswordRecoveryCard: FC = () => {
  const theme = useTheme();

  return (
    <AuthFormContainer imgSrc={lockImg}>
      <Typography variant="h5">Trouble logging in?</Typography>
      <Typography textAlign="center" color={theme.palette.text.secondary}>
        Enter your email, phone, or username and we&apos;ll send you a link to get back into your account.
      </Typography>
      <PasswordRecoveryForm />
      <OrDivider />
      <CreateAccountLink to={RouteEnum.SIGN_UP}>Create new account</CreateAccountLink>
    </AuthFormContainer>
  );
};

export default PasswordRecoveryCard;

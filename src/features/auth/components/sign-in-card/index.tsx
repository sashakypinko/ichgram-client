import { FC } from 'react';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { RouteEnum } from '@app/routes/enums/route.enum';
import OrDivider from '@shared/components/or-divider';
import AuthFormContainer from '../auth-form-container';
import SignInForm from '../sign-in-form';

const PasswordRecoveryLink = styled(Link)({
  textDecoration: 'none',
  color: '#00376B',
});

const SignInCard: FC = () => {
  return (
    <AuthFormContainer>
      <SignInForm />
      <OrDivider />
      <PasswordRecoveryLink to={RouteEnum.PASSWORD_RECOVERY}>Forgot password?</PasswordRecoveryLink>
    </AuthFormContainer>
  );
};

export default SignInCard;

import { FC } from 'react';
import AuthFormContainer from '../auth-form-container';
import SignUpForm from '../sign-up-form';
import { Typography, useTheme } from '@mui/material';
import Link from '@shared/components/link';

const SignUpCard: FC = () => {
  const theme = useTheme();

  return (
    <AuthFormContainer>
      <Typography variant="h5" textAlign="center" color={theme.palette.text.secondary}>
        Sign up to see photos and videos from your friends.
      </Typography>
      <SignUpForm />
      <Typography variant="body2" textAlign="center" color={theme.palette.text.secondary}>
        People who use our service may have uploaded your contact information to Instagram.
        <Link to="#"> Learn More</Link>
      </Typography>
      <Typography variant="body2" textAlign="center" color={theme.palette.text.secondary}>
        By signing up, you agree to our
        <Link to="#"> Terms</Link>,<Link to="#"> Privacy Policy </Link>
        and
        <Link to="#"> Cookies Policy</Link>
      </Typography>
    </AuthFormContainer>
  );
};

export default SignUpCard;

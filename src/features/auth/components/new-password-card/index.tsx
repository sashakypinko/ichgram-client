import { FC } from 'react';
import AuthFormContainer from '../auth-form-container';
import { RouteEnum } from '@app/routes/enums/route.enum';
import OrDivider from '@shared/components/or-divider';
import { styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import lockImg from '@assets/img/lock.svg';
import { fetchGetParam } from '@shared/helpers/url-helper';
import NewPasswordForm from '@features/auth/components/new-password-form';

const CreateAccountLink = styled(Link)({
  textDecoration: 'none',
  color: '#000000',
  fontWeight: 600,
});

const NewPasswordCard: FC = () => {
  const token = fetchGetParam('token') || '';

  return (
    <AuthFormContainer imgSrc={lockImg}>
      <Typography variant="h5">Change your password</Typography>
      <NewPasswordForm token={token} />
      <OrDivider />
      <CreateAccountLink to={RouteEnum.SIGN_UP}>Create new account</CreateAccountLink>
    </AuthFormContainer>
  );
};

export default NewPasswordCard;

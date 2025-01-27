import { ReactElement } from 'react';
import { Box, Container } from '@mui/material';
import SignInLinkCard from '@features/auth/components/sign-in-link-card';
import NewPasswordCard from '@features/auth/components/new-password-card';

const ResetPasswordPage = (): ReactElement => {
  return (
    <Container sx={{ pt: 10, display: 'flex', justifyContent: 'center' }} maxWidth="md">
      <Box display="flex" flexDirection="column" maxWidth={350} width="100%" gap={2}>
        <NewPasswordCard />
        <SignInLinkCard title="Back to" />
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;

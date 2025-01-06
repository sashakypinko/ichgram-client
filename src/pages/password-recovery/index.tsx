import { ReactElement } from 'react';
import { Box, Container } from '@mui/material';
import PasswordRecoveryCard from '@features/auth/components/password-recovery-card';
import SignInLinkCard from '@features/auth/components/sign-in-link-card';

const PasswordRecoveryPage = (): ReactElement => {
  return (
    <Container sx={{ pt: 10, display: 'flex', justifyContent: 'center' }} maxWidth="md">
      <Box display="flex" flexDirection="column" maxWidth={350} width="100%" gap={2}>
        <PasswordRecoveryCard />
        <SignInLinkCard title="Back to" />
      </Box>
    </Container>
  );
};

export default PasswordRecoveryPage;

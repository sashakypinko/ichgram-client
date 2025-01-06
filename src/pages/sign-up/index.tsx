import { ReactElement } from 'react';
import { Box, Container } from '@mui/material';
import SignUpCard from '@features/auth/components/sign-up-card';
import SignInLinkCard from '@features/auth/components/sign-in-link-card';

const SignUpPage = (): ReactElement => {
  return (
    <Container sx={{ pt: 10, display: 'flex', justifyContent: 'center' }} maxWidth="md">
      <Box display="flex" flexDirection="column" maxWidth={350} width="100%" gap={2}>
        <SignUpCard />
        <SignInLinkCard />
      </Box>
    </Container>
  );
};

export default SignUpPage;

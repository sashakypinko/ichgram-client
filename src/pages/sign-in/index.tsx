import { ReactElement } from 'react';
import { Container, Grid, styled } from '@mui/material';
import SignInCard from '@features/auth/components/sign-in-card';
import SignUpLinkCard from '@features/auth/components/sign-up-link-card';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';
import image from '@assets/img/iphone-view.png';

const Image = styled('img')({});

const SignInPage = (): ReactElement => {
  const isSm = useIsBreakpoint(Breakpoint.SM);

  return (
    <Container sx={{ pt: 10 }} maxWidth="md">
      <Grid container>
        {!isSm && (
          <Grid item md={6}>
            <Image src={image} alt="not-found-image" />
          </Grid>
        )}
        <Grid item display="flex" flexDirection="column" width="100%" gap={2} sm={12} md={6}>
          <SignInCard />
          <SignUpLinkCard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInPage;

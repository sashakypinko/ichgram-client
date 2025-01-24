import { ReactElement } from 'react';
import { Container, Grid, styled } from '@mui/material';
import SignInCard from '@features/auth/components/sign-in-card';
import SignUpLinkCard from '@features/auth/components/sign-up-link-card';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';
import image from '@assets/img/iphone-view.png';
import Page from '@shared/components/page';

const Image = styled('img')({
  width: '100%',
});

const SignInPage = (): ReactElement => {
  const isSm = useIsBreakpoint(Breakpoint.SM);
  const isMd = useIsBreakpoint(Breakpoint.MD);

  return (
    <Page hasNavbar={false}>
      <Container sx={{ py: 10 }} maxWidth="md">
        <Grid container spacing={isMd ? 4 : 8}>
          {!isSm && (
            <Grid item sm={6}>
              <Image src={image} alt="not-found-image" />
            </Grid>
          )}
          <Grid item display="flex" flexDirection="column" width="100%" gap={2} xs={12} sm={6}>
            <SignInCard />
            <SignUpLinkCard />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default SignInPage;

import { FC } from 'react';
import { Box, Container, Grid, styled, Typography, useTheme } from '@mui/material';
import Page from '@shared/components/page';
import image from '@assets/img/iphone-view.png';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

const Image = styled('img')({
  width: '100%',
});

const NotFoundPage: FC = () => {
  const theme = useTheme();
  const isMd = useIsBreakpoint(Breakpoint.MD);

  return (
    <Page>
      <Container sx={{ mt: isMd ? 2 : 20 }} maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={12} md={4} order={isMd ? 2 : 1}>
            <Image src={image} alt="sign-in-image" />
          </Grid>
          <Grid item xs={12} md={8} order={isMd ? 1 : 2}>
            <Box paddingY={8} display="flex" flexDirection="column" gap={2}>
              <Typography variant="h2">Oops! Page Not Found (404 Error)</Typography>
              <Typography variant="subtitle1" color={theme.palette.text.secondary}>
                We're sorry, but the page you're looking for doesn't seem to exist.
                <br />
                If you typed the URL manually, please double-check the spelling.
                <br />
                If you clicked on a link, it may be outdated or broken.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default NotFoundPage;

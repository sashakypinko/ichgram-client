import { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Page from '@shared/components/page';

const NotFoundPage: FC = () => {
  const theme = useTheme();

  return (
    <Page>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography align="center" variant="h2">
          Page Not Found
        </Typography>
        <Typography align="center" variant="subtitle1" color={theme.palette.text.secondary}>
          We’re sorry, the page you requested could not be found.
          <br />
          Please go back to the homepage.
        </Typography>
      </Box>
    </Page>
  );
};

export default NotFoundPage;

import { ReactElement } from 'react';
import { Box, Container, styled, Typography, useTheme } from '@mui/material';

const StyledContainer = styled(Container)({
  marginTop: 80,
  marginBottom: 80,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 32,
});

const ErrorFallback = (): ReactElement => {
  const theme = useTheme();

  return (
    <StyledContainer maxWidth="md">
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography align="center" variant="h2">
          Whoops...
        </Typography>
        <Typography align="center" variant="subtitle1" color={theme.palette.text.secondary}>
          We are sorry, there was an error.
          <br />
          Please try refreshing the page or come back later.
        </Typography>
      </Box>
    </StyledContainer>
  );
};

export default ErrorFallback;

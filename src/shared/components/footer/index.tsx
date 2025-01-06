import { ReactElement } from 'react';
import { Box, Container, styled, useTheme } from '@mui/material';

const FooterContainer = styled(Container)(({ theme }) => ({
  marginTop: 80,
  marginBottom: 80,
  background: theme.palette.background.default,
}));

const Footer = (): ReactElement => {
  const theme = useTheme();

  return <FooterContainer maxWidth="xl"></FooterContainer>;
};

export default Footer;

import { ReactElement } from 'react';
import { Container, styled } from '@mui/material';

const FooterContainer = styled(Container)(({ theme }) => ({
  marginTop: 80,
  marginBottom: 80,
  background: theme.palette.background.default,
}));

const Footer = (): ReactElement => {
  return <FooterContainer maxWidth="xl"></FooterContainer>;
};

export default Footer;

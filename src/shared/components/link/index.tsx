import type { ReactElement, ReactNode } from 'react';
import { styled } from '@mui/material';
import { ButtonProps } from '@mui/material/Button/Button';
import { Link as CommonLink } from 'react-router-dom';

const StyledLink = styled(CommonLink)(({ theme }) => ({
  fontWeight: 500,
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

interface Props extends ButtonProps {
  to: string;
  children: ReactNode;
}

const Link = ({ to, children }: Props): ReactElement => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default Link;

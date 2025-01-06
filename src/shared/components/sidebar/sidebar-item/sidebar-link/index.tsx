import { FC, ReactNode } from 'react';
import { styled } from '@mui/material';
import { Link, To } from 'react-router-dom';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
}));

interface Props {
  onClick: () => void;
  to: To;
  children: ReactNode;
}

const SidebarLink: FC<Props> = ({ to, onClick, children }) => {
  return (
    <StyledLink to={to} onClick={onClick}>
      {children}
    </StyledLink>
  );
};

export default SidebarLink;

import { MouseEvent, ReactElement, ReactNode } from 'react';
import { styled } from '@mui/material';
import { ButtonProps } from '@mui/material/Button/Button';
import { Link as CommonLink } from 'react-router-dom';

const StyledLink = styled(CommonLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: theme.palette.text.primary,
}));

interface Props extends ButtonProps {
  to: string;
  onClick?: (e: MouseEvent) => void;
  children: ReactNode;
}

const PlainLink = ({ to, onClick, children }: Props): ReactElement => {
  return (
    <StyledLink to={to} onClick={onClick}>
      {children}
    </StyledLink>
  );
};

export default PlainLink;

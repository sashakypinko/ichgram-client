import { FC, ReactNode } from 'react';
import { Box, styled } from '@mui/material';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px 40px',
  borderRadius: 1,
  border: '1px solid #DBDBDB',
  gap: 16,
});

interface Props {
  children: ReactNode;
}

const BorderedBox: FC<Props> = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default BorderedBox;

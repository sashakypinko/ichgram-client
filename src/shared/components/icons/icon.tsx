import { FC, ReactNode } from 'react';
import { styled, Typography } from '@mui/material';

const StyledIcon = styled(Typography)(
  () => `
  display: flex;
  align-items: center;
`,
);

interface Props {
  children: ReactNode;
}

export interface IconProps {
  size?: number;
  inverse?: boolean;
}

export const Icon: FC<Props> = ({ children }) => {
  return <StyledIcon>{children}</StyledIcon>;
};

import { FC } from 'react';
import { Box, Divider, styled, Typography } from '@mui/material';

const StyledOrDivider = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  margin: '16px 0',
});

const OrDivider: FC = () => {
  return (
    <StyledOrDivider>
      <Divider sx={{ flex: 1 }} />
      <Typography sx={{ mx: 2, color: '#737373' }} fontSize={13} fontWeight={600}>
        OR
      </Typography>
      <Divider sx={{ flex: 1 }} />
    </StyledOrDivider>
  );
};

export default OrDivider;

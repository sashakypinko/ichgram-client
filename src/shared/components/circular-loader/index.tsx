import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

const CircularLoader: FC = () => {
  return (
    <Box sx={{ p: 4 }} width="100%" display="flex" justifyContent="center">
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#989494" />
            <stop offset="100%" stopColor="#6a8cdc" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#gradient)' } }} />
    </Box>
  );
};

export default CircularLoader;

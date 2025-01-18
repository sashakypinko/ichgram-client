import { FC } from 'react';
import { Box, Skeleton, styled } from '@mui/material';

const LoaderContainer = styled(Box)({
  width: '100%',
});

const MediaLoader: FC = () => {
  return (
    <LoaderContainer>
      <Skeleton variant="rectangular" height="100%" />
    </LoaderContainer>
  );
};

export default MediaLoader;

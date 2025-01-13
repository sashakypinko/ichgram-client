import { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';
import mediaImg from '@assets/img/media.svg';

const EmptyPostsContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
});

const EmptyPosts: FC = () => {
  return (
    <EmptyPostsContainer>
      <img src={mediaImg} alt="media_icon" />
      <Typography variant="h3">No Posts Yet</Typography>
    </EmptyPostsContainer>
  );
};

export default EmptyPosts;

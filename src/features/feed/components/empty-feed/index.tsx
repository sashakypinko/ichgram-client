import { FC } from 'react';
import { Box, styled, Typography, useTheme } from '@mui/material';
import checkImg from '@assets/img/check.png';

const Image = styled('img')({
  width: 96,
});

const EmptyFeedContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 0',
  gap: 16,
});

const EmptyFeed: FC = () => {
  const theme = useTheme();

  return (
    <EmptyFeedContainer>
      <Image src={checkImg} alt="media_icon" />
      <Box>
        <Typography textAlign="center" variant="h5">
          You've seen all the updates
        </Typography>
        <Typography textAlign="center" variant="body2" color={theme.palette.text.secondary}>
          You have viewed all new publications
        </Typography>
      </Box>
    </EmptyFeedContainer>
  );
};

export default EmptyFeed;

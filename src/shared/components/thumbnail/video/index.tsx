import { FC } from 'react';
import { styled } from '@mui/material';
import { ThumbnailComponentProps } from '@shared/components/thumbnail';

const StyledVideo = styled('video')({
  width: '100%',
  height: '100%',
  background: '#000',
  outline: 'none',
  objectFit: 'cover',
});

const Video: FC<ThumbnailComponentProps> = ({ source }) => {
  return <StyledVideo src={source} />;
};

export default Video;

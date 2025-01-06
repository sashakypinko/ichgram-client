import { FC } from 'react';
import { styled } from '@mui/material';
import { ThumbnailComponentProps } from '@shared/components/thumbnail';

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  objectFit: 'cover',
}));

const Image: FC<ThumbnailComponentProps> = ({ source }) => {
  return <StyledImage src={source} alt="message_media" />;
};

export default Image;

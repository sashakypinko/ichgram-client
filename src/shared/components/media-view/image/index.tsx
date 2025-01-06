import { FC, useState } from 'react';
import { styled } from '@mui/material';
import { MediaViewComponent } from '@shared/components/media-view/types';
import ImageFullView from '@shared/components/media-view/image/image-full-view';

const StyledImage = styled('img')({
  width: '100%',
  background: '#fff',
  objectFit: 'cover',
  cursor: 'pointer',
});

const Image: FC<MediaViewComponent> = ({ mediaId, src, withFullView }) => {
  const [openFullView, setOpenFullView] = useState<boolean>(false);

  return (
    <>
      <StyledImage src={src} alt="image_preview" onClick={() => withFullView && setOpenFullView(true)} />
      {withFullView && mediaId && (
        <ImageFullView mediaId={mediaId} open={openFullView} onClose={() => setOpenFullView(false)} />
      )}
    </>
  );
};

export default Image;

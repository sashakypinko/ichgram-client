import { FC, useState } from 'react';
import { styled } from '@mui/material';
import { MediaViewComponent } from '@shared/components/media-view/types';
import VideoFullView from '@shared/components/media-view/video/video-full-view';

const StyledImage = styled('img')({
  width: '100%',
  background: '#fff',
  objectFit: 'cover',
  cursor: 'pointer',
});

const Video: FC<MediaViewComponent> = ({ mediaId, src, withFullView }) => {
  const [openFullView, setOpenFullView] = useState<boolean>(false);
  return (
    <>
      <StyledImage src={src} alt="video_preview" onClick={() => withFullView && setOpenFullView(true)} />
      {withFullView && mediaId && (
        <VideoFullView mediaId={mediaId} open={openFullView} onClose={() => setOpenFullView(false)} />
      )}
    </>
  );
};

export default Video;

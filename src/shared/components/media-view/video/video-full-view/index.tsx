import { FC } from 'react';
import { Dialog as MuiDialog, styled } from '@mui/material';
import { getOriginalMediaUrl } from '@shared/helpers/media-helper';

const StyledDialog = styled(MuiDialog)({
  '& .MuiPaper-root': {
    background: 'rgba(158,65,65,0)',
    boxShadow: 'none',
  },
});

const StyledVideo = styled('video')({
  width: '100%',
  background: '#000',
  outline: 'none',
  cursor: 'pointer',
});

interface Props {
  mediaId: string;
  open: boolean;
  onClose: () => void;
}

const VideoFullView: FC<Props> = ({ mediaId, open, onClose }) => {
  const mediaUrl = getOriginalMediaUrl(mediaId);

  return (
    <StyledDialog maxWidth="lg" open={open} onClose={onClose} fullWidth>
      <StyledVideo src={mediaUrl} controls autoPlay />
    </StyledDialog>
  );
};

export default VideoFullView;

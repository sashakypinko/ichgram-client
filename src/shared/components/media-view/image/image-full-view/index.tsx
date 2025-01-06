import { FC } from 'react';
import { Dialog as MuiDialog, styled } from '@mui/material';
import { getOriginalMediaUrl } from '@shared/helpers/media-helper';

const StyledDialog = styled(MuiDialog)({
  '& .MuiPaper-root': {
    background: 'rgba(158,65,65,0)',
    boxShadow: 'none',
  },
});

interface Props {
  mediaId: string;
  open: boolean;
  onClose: () => void;
}

const ImageFullView: FC<Props> = ({ mediaId, open, onClose }) => {
  const mediaUrl = getOriginalMediaUrl(mediaId);

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth>
      <img src={mediaUrl} alt="image_full_view" />
    </StyledDialog>
  );
};

export default ImageFullView;

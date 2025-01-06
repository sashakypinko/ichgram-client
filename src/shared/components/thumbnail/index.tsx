import { FC } from 'react';
import { Box, styled } from '@mui/material';
import CancelButton from '@shared/components/cancel-button';
import MediaType from '@shared/enums/media-type.enum';
import Image from './image';
import Video from './video';
import File from './file';

const CancelButtonBox = styled(Box)({
  position: 'absolute',
  right: -8,
  top: -8,
});

const ThumbnailContainer = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: 16,
  border: '1px solid',
  borderColor: theme.palette.text.disabled,
  overflow: 'hidden',
}));

export type ThumbnailComponentProps = { source: string };

const thumbnailComponents: { [key in MediaType]: FC<ThumbnailComponentProps> } = {
  [MediaType.IMAGE]: Image,
  [MediaType.VIDEO]: Video,
  [MediaType.FILE]: File,
};

interface Props {
  file: File;
  onCancel: () => void;
}

const Thumbnail: FC<Props> = ({ file, onCancel }) => {
  const url = URL.createObjectURL(file);

  const getMediaType = () => {
    if (file.type.startsWith('image/')) return MediaType.IMAGE;
    if (file.type.startsWith('video/')) return MediaType.VIDEO;

    return MediaType.FILE;
  };

  const ThumbnailComponent = thumbnailComponents[getMediaType()];

  return (
    <Box position="relative" width="max-content">
      <ThumbnailContainer>
        <ThumbnailComponent source={url} />
      </ThumbnailContainer>
      <CancelButtonBox>
        <CancelButton onClick={onCancel} />
      </CancelButtonBox>
    </Box>
  );
};

export default Thumbnail;

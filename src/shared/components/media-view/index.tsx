import { FC, useEffect, useState } from 'react';
import { Box, styled, SxProps } from '@mui/material';
import MediaType from '@shared/enums/media-type.enum';
import Image from './image';
import Video from './video';
import File from './file';
import {
  retrieveFileNameFromHeaders,
  retrieveFileTypeFromHeaders,
  retrieveSizeFromHeaders,
} from '@shared/helpers/file-helper';
import { MediaData, MediaViewComponent } from '@shared/components/media-view/types';
import brokenFileImg from '@assets/img/broken-file.png';
import { getMediaUrl, getOriginalMediaUrl } from '@shared/helpers/media-helper';
import { Size } from '@shared/enums/size.enum';
import MediaLoader from '@shared/components/media-view/media-loader';

const MediaContainer = styled(Box)({
  display: 'flex',
  overflow: 'hidden',
});

const mediaComponents: { [key in MediaType]: FC<MediaViewComponent> } = {
  [MediaType.IMAGE]: Image,
  [MediaType.VIDEO]: Video,
  [MediaType.FILE]: File,
};

const defaultMediaData = {
  type: MediaType.IMAGE,
  fileName: '',
  size: '',
  src: brokenFileImg,
  mediaId: null,
};

interface Props {
  mediaId?: string;
  mediaUrl?: string;
  size?: Size;
  sx?: SxProps;
  withFullView?: boolean;
}

const MediaView: FC<Props> = ({ mediaId = null, mediaUrl = '', sx, size = Size.SMALL, withFullView = true }) => {
  const [mediaData, setMediaData] = useState<MediaData>(defaultMediaData);
  const [loading, setLoading] = useState<boolean>(false);

  const resizedMediaUrl = mediaId ? getMediaUrl(mediaId, size) : mediaUrl;
  const originalMediaUrl = mediaId ? getOriginalMediaUrl(mediaId) : mediaUrl;

  const fetchContentType = async () => {
    if (!originalMediaUrl) return;

    setLoading(true);
    try {
      const isBlob = originalMediaUrl.startsWith('blob');
      const response = await fetch(originalMediaUrl, { method: isBlob ? 'GET' : 'HEAD' });

      setMediaData({
        fileName: retrieveFileNameFromHeaders(response.headers),
        type: retrieveFileTypeFromHeaders(response.headers),
        size: retrieveSizeFromHeaders(response.headers),
        src: resizedMediaUrl,
        mediaId,
      });
    } catch (error) {
      console.error('Error fetching media content type:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContentType();
  }, [originalMediaUrl]);

  if (loading) {
    return <MediaLoader />;
  }

  const MediaComponent = mediaComponents[mediaData?.type];
  const isThumbnail = size === Size.THUMBNAIL;

  return (
    <MediaContainer
      sx={
        sx || {
          borderRadius: isThumbnail ? 2 : 4,
          minWidth: isThumbnail ? 64 : 'auto',
          height: isThumbnail ? 64 : 'auto',
        }
      }
    >
      <MediaComponent {...mediaData} thumbnail={isThumbnail} withFullView={withFullView} />
    </MediaContainer>
  );
};

export default MediaView;

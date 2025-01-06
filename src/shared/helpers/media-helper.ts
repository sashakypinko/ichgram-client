import { Size } from '@shared/enums/size.enum';

const mediaBaseUrl = import.meta.env.VITE_MEDIA_BASE_URL;

export const getMediaUrl = (mediaId: string, size: Size) => {
  return `${getOriginalMediaUrl(mediaId)}${size !== Size.ORIGINAL ? `?size=${size}` : ''}`;
};

export const getOriginalMediaUrl = (mediaId: string): string => {
  return `${mediaBaseUrl}${mediaId}`;
};

export const getThumbnailMediaUrl = (mediaId: string): string => getMediaUrl(mediaId, Size.THUMBNAIL);

export const getSmallMediaUrl = (mediaId: string): string => getMediaUrl(mediaId, Size.SMALL);

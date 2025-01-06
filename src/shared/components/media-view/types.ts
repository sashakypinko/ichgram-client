import MediaType from '@shared/enums/media-type.enum';

export interface MediaData {
  type: MediaType;
  src: string;
  fileName: string;
  size: string;
  mediaId: string | null;
}
export interface MediaViewComponent extends MediaData {
  thumbnail: boolean;
  withFullView: boolean;
}

import MediaType from '@shared/enums/media-type.enum';

export const retrieveFileNameFromHeaders = (headers: Headers): string => {
  const contentDisposition = headers.get('Content-Disposition');

  if (contentDisposition) {
    const match = contentDisposition.match(/filename="(.+)"/);
    if (match && match[1]) {
      return match[1];
    }
  }

  return '';
};

export const retrieveFileTypeFromHeaders = (headers: Headers): MediaType => {
  const contentType = headers.get('Content-Type');

  if (contentType?.startsWith('image/')) {
    return MediaType.IMAGE;
  }
  if (contentType?.startsWith('video/')) {
    return MediaType.VIDEO;
  }

  return MediaType.FILE;
};

export const retrieveSizeFromHeaders = (headers: Headers): string => {
  const contentLength = headers.get('Content-Length');

  if (!contentLength) return '0 B';

  const bytes = parseInt(contentLength);
  const units = ['B', 'K', 'M', 'G'];
  const k = 1024;

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formatted = (bytes / Math.pow(k, i)).toFixed(1);

  return `${formatted} ${units[i]}`;
};

export const downloadFile = (url: string): void => {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = url.split('/').pop() || 'download';

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

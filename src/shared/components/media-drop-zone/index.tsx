import { FC, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Box, CircularProgress, styled, Typography } from '@mui/material';
import Button from '@shared/components/button';

import mediaImg from '@assets/img/media.svg';

const DropZoneContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 360,
});

const Content = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
});

interface Props {
  onLoad: (file: File) => void;
  accept?: Accept;
}

const defaultAccept = {
  'image/jpeg': ['.jpeg', '.png'],
};

const MediaDropZone: FC<Props> = ({ onLoad, accept = defaultAccept }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[] = []) => {
    setLoading(true);
    setTimeout(async () => {
      if (acceptedFiles.length) {
        onLoad(acceptedFiles[0]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 0);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
    disabled: loading,
    multiple: false,
  });

  return (
    <DropZoneContainer sx={{ background: isDragActive ? '#c8c8c8' : '#fafafa' }} {...getRootProps()}>
      <input {...getInputProps()} />
      {loading && <CircularProgress size={96} />}
      {!loading && (
        <Content>
          <img src={mediaImg} alt="media_icon" />
          <Typography variant="h6">Drag photos and videos here</Typography>
          <Button variant="contained">Select from computer</Button>
        </Content>
      )}
    </DropZoneContainer>
  );
};

export default MediaDropZone;

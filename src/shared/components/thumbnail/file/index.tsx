import { FC } from 'react';
import { Box, styled } from '@mui/material';
import { ThumbnailComponentProps } from '@shared/components/thumbnail';
import { TextSnippetRounded } from '@mui/icons-material';

const FileBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

const File: FC<ThumbnailComponentProps> = () => {
  return (
    <FileBox>
      <TextSnippetRounded fontSize="large" />
    </FileBox>
  );
};

export default File;

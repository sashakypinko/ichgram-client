import { FC, useState } from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { DownloadRounded, TextSnippetRounded } from '@mui/icons-material';
import { MediaData } from '@shared/components/media-view/types';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';
import { downloadFile } from '@shared/helpers/file-helper';

const FileBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  background: '#fff',
  color: '#000',
  padding: '0 8px',
});

const FileName = styled(Typography)({
  fontWeight: 600,
});

const FileSize = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
  fontSize: 12,
}));

const File: FC<MediaData & { thumbnail: boolean }> = ({ src, fileName, size, thumbnail }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const isSm = useIsBreakpoint(Breakpoint.SM);

  return (
    <FileBox>
      <IconButton
        color="inherit"
        onClick={() => downloadFile(src)}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered || isSm ? <DownloadRounded fontSize="large" /> : <TextSnippetRounded fontSize="large" />}
      </IconButton>
      {!thumbnail && (
        <Box sx={{ p: 1 }}>
          <FileName>{fileName}</FileName>
          <FileSize>{size}</FileSize>
        </Box>
      )}
    </FileBox>
  );
};

export default File;

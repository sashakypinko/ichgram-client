import { FC } from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { IMessage } from '@entities/message/model/message';

const MessageContainer = styled(Box)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.text.disabled,
  padding: 12,
  borderRadius: 12,
}));

interface Props {
  title: string;
  message: IMessage;
  onCancel: () => void;
}

const MessageInteractive: FC<Props> = ({ title, message, onCancel }) => {
  return (
    <MessageContainer sx={{}} display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography color="#939393">{title}:</Typography>
        <Typography>{message.content}</Typography>
      </Box>
      <IconButton color="inherit" onClick={onCancel}>
        <CloseRounded />
      </IconButton>
    </MessageContainer>
  );
};

export default MessageInteractive;

import { FC } from 'react';
import { IMessage } from '@entities/message/model/message';
import { Box, styled, Typography } from '@mui/material';
import MediaView from '@shared/components/media-view';
import { Size } from '@shared/enums/size.enum';

const MessageBlock = styled(Box)({
  display: 'flex',
  alignItems: 'end',
  gap: 12,
  padding: 8,
  borderLeft: '8px solid #0000004a',
  margin: '8px 12px',
  borderRadius: 8,
  background: '#0000000f',
});

interface Props {
  message: IMessage;
  onClick: () => void;
}

const RepliedMessage: FC<Props> = ({ message, onClick }) => {
  return (
    <MessageBlock onClick={onClick}>
      {message.mediaId && <MediaView mediaId={message.mediaId} size={Size.THUMBNAIL} />}
      <Typography fontWeight={500}>{message.content}</Typography>
    </MessageBlock>
  );
};

export default RepliedMessage;

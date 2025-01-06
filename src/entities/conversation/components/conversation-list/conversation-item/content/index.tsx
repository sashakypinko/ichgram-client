import { FC } from 'react';
import { ListItemText } from '@mui/material';
import { shortenString } from '@shared/helpers/string-helper';
import { formatDistanceToNow } from 'date-fns';
import { IMessage } from '@entities/message/model/message';

interface Props {
  title: string;
  lastMessage?: IMessage;
}

const Content: FC<Props> = ({ title, lastMessage }) => {
  const timeDistance = lastMessage?.sentAt ? formatDistanceToNow(lastMessage.sentAt, { addSuffix: true }) : '';

  if (lastMessage) {
    return (
      <ListItemText
        primary={title}
        secondary={
          <>
            {shortenString(lastMessage.content, 22)}&emsp;•&emsp;{timeDistance}
          </>
        }
      />
    );
  }

  return <ListItemText primary={title} secondary="No messages" />;
};

export default Content;

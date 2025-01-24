import { FC, useEffect, useState } from 'react';
import { IMessage } from '@entities/message/model/message';
import { Box, IconButton, styled, Typography } from '@mui/material';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import UserAvatar from '@entities/user/components/user-avatar';
import { Reply, Trash, Edit } from '@shared/components/icons';
import { useAppDispatch } from '@app/hooks';
import { deleteMessage, markMessageAsRead, setEditingMessage, setReplyingMessage } from '@entities/message/store/slice';
import useInView from '@shared/hooks/use-in-view.hook';
import MediaView from '@shared/components/media-view';
import RepliedMessage from '@entities/message/components/message-list/message-item/replied-message';

const MessageContainer = styled(Box)({
  display: 'flex',
  alignItems: 'start',
  gap: 16,
  transition: 'background-color 0.8s ease-in-out',
});

const MessageBlock = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: 3,
  borderRadius: 16,
  maxWidth: 500,
});

const ViewedLabel = styled(Typography)({
  color: '#000',
  position: 'absolute',
  bottom: -20,
  right: 8,
});

const Content = styled(Typography)({
  wordBreak: 'break-all',
  padding: '6px 12px',
  fontWeight: 500,
});

interface Props {
  message: IMessage;
  isNewest: boolean;
  forwardRef: (el: HTMLDivElement) => void;
  onRepliedMessageClick: (id: string) => void;
}

const MessageItem: FC<Props> = ({ message, isNewest, forwardRef, onRepliedMessageClick }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [markingAsRead, setMarkingAsRead] = useState<boolean>(false);

  const { isInView, elementRef } = useInView<HTMLDivElement>({ threshold: 0.5 });
  const authUser = useAuthUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!markingAsRead && authUser && isInView && !message.readBy.includes(authUser._id)) {
      setMarkingAsRead(true);
      dispatch(markMessageAsRead(message._id));
    }
  }, [isInView, message, authUser, markingAsRead]);

  const handleDelete = () => {
    dispatch(deleteMessage(message));
  };

  const isOwn = message.senderId === authUser?._id;
  const viewed = message.readBy.length > 1;

  return (
    <MessageContainer
      ref={forwardRef}
      flexDirection={isOwn ? 'row-reverse' : 'row'}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!isOwn && <UserAvatar user={message.sender} />}
      <MessageBlock
        ref={elementRef}
        sx={{
          background: isOwn ? '#4D00FF' : '#EFEFEF',
          color: isOwn ? '#fff' : '#000',
        }}
      >
        {message.repliedMessage && (
          <RepliedMessage
            message={message.repliedMessage}
            onClick={() => onRepliedMessageClick(message.repliedMessage?._id || '')}
          />
        )}
        {message.mediaId && <MediaView sx={{ width: 250, borderRadius: 4 }} mediaId={message.mediaId} />}
        {message.content && <Content textAlign={isOwn ? 'end' : 'start'}>{message.content}</Content>}
        {isOwn && isNewest && viewed && <ViewedLabel variant="caption">Viewed</ViewedLabel>}
      </MessageBlock>
      {hovered && (
        <Box alignSelf="center">
          {isOwn && (
            <>
              <IconButton size="small" onClick={handleDelete}>
                <Trash />
              </IconButton>
              <IconButton size="small" onClick={() => dispatch(setEditingMessage(message))}>
                <Edit />
              </IconButton>
            </>
          )}
          <IconButton size="small" onClick={() => dispatch(setReplyingMessage(message))}>
            <Reply />
          </IconButton>
        </Box>
      )}
    </MessageContainer>
  );
};

export default MessageItem;

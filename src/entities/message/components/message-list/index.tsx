import { FC, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectMessage } from '@entities/message/store/selectors';
import { getMessages } from '@entities/message/store/slice';
import { IMessage } from '@entities/message/model/message';
import MessageItem from '@entities/message/components/message-list/message-item';
import { Box, styled } from '@mui/material';
import { selectConversation } from '@entities/conversation/store/selectors';

const MessageListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: 24,
});

interface Props {
  onLoad: () => void;
}

const MessageList: FC<Props> = ({ onLoad }) => {
  const { messages } = useAppSelector(selectMessage);
  const { currentConversation } = useAppSelector(selectConversation);
  const dispatch = useAppDispatch();
  const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToMessage = (id: string) => {
    const targetElement = messageRefs.current[id];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetElement.classList.add('highlight');
      setTimeout(() => targetElement.classList.remove('highlight'), 1000);
    }
  };

  useEffect(() => {
    if (currentConversation && !messages[currentConversation._id]?.length) {
      dispatch(
        getMessages({
          payload: { conversationId: currentConversation._id },
          onSuccess: onLoad,
        }),
      );
    }
  }, [currentConversation]);

  const userMessages: IMessage[] = currentConversation ? messages[currentConversation._id] || [] : [];

  return (
    <MessageListContainer>
      {userMessages.map((message, index) => (
        <MessageItem
          key={message._id}
          forwardRef={(el: HTMLDivElement) => (messageRefs.current[message._id] = el)}
          onRepliedMessageClick={scrollToMessage}
          message={message}
          isNewest={index === 0}
        />
      ))}
    </MessageListContainer>
  );
};

export default MessageList;

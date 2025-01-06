import { FC, useEffect, useRef } from 'react';
import { Box, CircularProgress, styled } from '@mui/material';
import MessageList from '@entities/message/components/message-list';
import UserInfo from '@features/chat/components/user-info';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import useScrollBottom from '@shared/hooks/use-scroll-bottom.hook';
import { selectConversation } from '@entities/conversation/store/selectors';
import MessageInput from '@entities/message/components/message-input';
import MessageInteractive from '@entities/message/components/message-interactive';
import { getMessages, setEditingMessage, setReplyingMessage } from '@entities/message/store/slice';
import { selectMessage } from '@entities/message/store/selectors';
import useCorrespondent from '@entities/conversation/hooks/use-correspondent.hook';
import EmptyChat from '@features/chat/components/empty-chat';
import ChatHeader from '@features/chat/components/chat-header';
import { setCurrentConversation } from '@entities/conversation/store/slice';

const ChatContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const InputWrapper = styled(Box)({
  padding: 16,
});

const MessageListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,
  padding: 16,
  overflowY: 'scroll',
});

const UserInfoWrapper = styled(Box)({
  margin: '64px 0',
});

interface Props {
  conversationId: string;
}

const Chat: FC<Props> = ({ conversationId }) => {
  const { conversations, currentConversation } = useAppSelector(selectConversation);
  const { messages, replyingMessage, editingMessage, loading } = useAppSelector(selectMessage);
  const dispatch = useAppDispatch();
  const messageListContainerRef = useRef<HTMLDivElement>();
  const scrollBottom = useScrollBottom(messageListContainerRef);
  const correspondent = useCorrespondent(currentConversation);

  useEffect(() => {
    const conversation = conversations.find(({ _id }) => conversationId === _id);

    if (conversation && conversation?._id !== currentConversation?._id) {
      dispatch(setCurrentConversation(conversation));
      scrollBottom();
    }
  }, [conversationId, conversations]);

  const loadOlderMessages = (previousScrollHeight: number) => {
    if (loading) return;

    dispatch(
      getMessages({
        payload: {
          conversationId,
          offset: messages[conversationId]?.length || 0,
        },
        onSuccess: () => {
          setTimeout(() => {
            if (messageListContainerRef.current) {
              messageListContainerRef.current.scrollTop =
                messageListContainerRef.current.scrollHeight - previousScrollHeight;
            }
          }, 0);
        },
      }),
    );
  };

  const handleLoad = () => {
    scrollBottom();
  };

  const handleScroll = () => {
    if (messageListContainerRef.current) {
      if (messageListContainerRef.current.scrollTop === 0) {
        loadOlderMessages(messageListContainerRef.current.scrollHeight);
      }
    }
  };

  if (!currentConversation || !correspondent) return <EmptyChat />;

  return (
    <ChatContainer>
      <ChatHeader />
      <MessageListContainer ref={messageListContainerRef} onScroll={handleScroll}>
        <UserInfoWrapper>
          <UserInfo user={correspondent} />
        </UserInfoWrapper>
        {loading && <CircularProgress color="inherit" size="24px" />}
        <MessageList onLoad={handleLoad} />
      </MessageListContainer>
      <Box sx={{ px: 2 }}>
        {replyingMessage && (
          <MessageInteractive
            title="Your reply on"
            message={replyingMessage}
            onCancel={() => dispatch(setReplyingMessage(null))}
          />
        )}
        {editingMessage && (
          <MessageInteractive
            title="Edit message"
            message={editingMessage}
            onCancel={() => dispatch(setEditingMessage(null))}
          />
        )}
      </Box>
      <InputWrapper>
        <MessageInput conversationId={currentConversation._id} onSent={scrollBottom} />
      </InputWrapper>
    </ChatContainer>
  );
};

export default Chat;

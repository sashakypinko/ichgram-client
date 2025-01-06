import { FC } from 'react';
import { Box, styled } from '@mui/material';
import NewConversationCard from '@entities/conversation/components/new-conversation-card';

const EmptyChatContainer = styled(Box)({
  width: '100%',
  maxHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const EmptyChat: FC = () => {
  return (
    <EmptyChatContainer>
      <NewConversationCard />
    </EmptyChatContainer>
  );
};

export default EmptyChat;

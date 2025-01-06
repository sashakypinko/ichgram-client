import { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';
import UserAvatar from '@entities/user/components/user-avatar';
import { useAppSelector } from '@app/hooks';
import { selectConversation } from '@entities/conversation/store/selectors';
import useCorrespondent from '@entities/conversation/hooks/use-correspondent.hook';
import { ConversationType } from '@entities/conversation/enums/conversation.enum';
import ManageChatMenu from '@features/chat/components/manage-chat-menu';

const Container = styled(Box)(({ theme }) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.text.disabled,
  minHeight: 80,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
}));

const ChatHeader: FC = () => {
  const { currentConversation } = useAppSelector(selectConversation);
  const correspondent = useCorrespondent(currentConversation);

  if (!currentConversation) {
    return null;
  }

  return (
    <Container>
      {currentConversation.type === ConversationType.PRIVATE ? (
        <UserAvatar user={correspondent} size={44} withName />
      ) : (
        <Typography variant="h5">{currentConversation.title}</Typography>
      )}
      <ManageChatMenu />
    </Container>
  );
};

export default ChatHeader;

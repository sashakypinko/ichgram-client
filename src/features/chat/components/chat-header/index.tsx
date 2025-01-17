import { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';
import UserAvatar from '@entities/user/components/user-avatar';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectConversation } from '@entities/conversation/store/selectors';
import useCorrespondent from '@entities/conversation/hooks/use-correspondent.hook';
import { ConversationType } from '@entities/conversation/enums/conversation.enum';
import ManageChatMenu from '@features/chat/components/manage-chat-menu';
import BackButton from '@shared/components/back-button';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';
import { setCurrentConversation } from '@entities/conversation/store/slice.ts';
import { generatePath, useNavigate } from 'react-router-dom';
import { RouteEnum } from '@app/routes/enums/route.enum.ts';

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
  const isMd = useIsBreakpoint(Breakpoint.MD);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    dispatch(setCurrentConversation(null))
    navigate(generatePath(RouteEnum.DIRECT));
  }

  if (!currentConversation) {
    return null;
  }

  return (
    <Container>
      <Box display="flex" alignItems="center" gap={2}>
        {isMd && <BackButton onClick={handleBackClick} />}
        {currentConversation.type === ConversationType.PRIVATE ? (
          <UserAvatar user={correspondent} size={44} withName />
        ) : (
          <Typography variant="h5">{currentConversation.title}</Typography>
        )}
      </Box>
      <ManageChatMenu />
    </Container>
  );
};

export default ChatHeader;

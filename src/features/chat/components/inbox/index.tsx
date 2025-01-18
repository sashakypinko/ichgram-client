import { FC, useState } from 'react';
import { Box, styled } from '@mui/material';
import ConversationList from '@entities/conversation/components/conversation-list';
import InboxHeader from '@features/chat/components/inbox/inbox-header';
import Breakpoint from '@shared/enums/breakpoint.enum';
import EmptyChat from '@features/chat/components/empty-chat';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import { useAppSelector } from '@app/hooks';
import { selectConversation } from '@entities/conversation/store/selectors';

const InboxContainer = styled(Box)(({ theme }) => ({
  maxWidth: 350,
  borderRight: '1px solid',
  borderColor: theme.palette.text.disabled,

  [theme.breakpoints.down(Breakpoint.MD)]: {
    maxWidth: '100%',
  },
}));

const Inbox: FC = () => {
  const [minified, setMinified] = useState<boolean>(false);

  const { conversations } = useAppSelector(selectConversation);

  const isMd = useIsBreakpoint(Breakpoint.MD);

  return (
    <InboxContainer width={minified ? 'auto' : '100%'}>
      <InboxHeader minified={minified} onMinifiedChange={setMinified} />
      <ConversationList minified={minified} emptyMessage="You don't have any chats yet." />
      {isMd && !conversations.length && <EmptyChat />}
    </InboxContainer>
  );
};

export default Inbox;

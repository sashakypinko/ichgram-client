import { FC } from 'react';
import { List, styled } from '@mui/material';
import ConversationList from '@entities/conversation/components/conversation-list';
import InboxHeader from '@features/chat/components/inbox/inbox-header';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

const InboxContainer = styled(List)(({ theme }) => ({
  maxWidth: 350,
  width: '100%',
  borderRight: '1px solid',
  borderColor: theme.palette.text.disabled,

  [theme.breakpoints.down(Breakpoint.MD)]: {
    width: 'auto',
  },
}));

const Inbox: FC = () => {
  const isMd = useIsBreakpoint(Breakpoint.MD);
  return (
    <InboxContainer>
      <InboxHeader minified={isMd} />
      <ConversationList minified={isMd} />
    </InboxContainer>
  );
};

export default Inbox;

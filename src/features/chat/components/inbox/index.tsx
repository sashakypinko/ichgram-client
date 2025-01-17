import { FC, useState } from 'react';
import { Box, styled } from '@mui/material';
import ConversationList from '@entities/conversation/components/conversation-list';
import InboxHeader from '@features/chat/components/inbox/inbox-header';
import Breakpoint from '@shared/enums/breakpoint.enum';

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
  
  return (
    <InboxContainer width={minified ? 'auto' : '100%'}>
      <InboxHeader minified={minified} onMinifiedChange={setMinified} />
      <ConversationList minified={minified} />
    </InboxContainer>
  );
};

export default Inbox;

import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Inbox from '@features/chat/components/inbox';
import Chat from '@features/chat/components/chat';
import EmptyChat from '@features/chat/components/empty-chat';
import Page from '@shared/components/page';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

const DirectPage: FC = () => {
  const { id } = useParams();
  const isMd = useIsBreakpoint(Breakpoint.MD);
  const isSm = useIsBreakpoint(Breakpoint.SM);

  if (isMd) {
    return <Page paddingTop={isSm ? 9 : 0}>{id ? <Chat conversationId={id} /> : <Inbox />}</Page>;
  }

  return (
    <Page>
      <Inbox />
      {id ? <Chat conversationId={id} /> : <EmptyChat />}
    </Page>
  );
};

export default DirectPage;

import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Inbox from '@features/chat/components/inbox';
import Chat from '@features/chat/components/chat';
import EmptyChat from '@features/chat/components/empty-chat';
import Page from '@shared/components/page';

const DirectPage: FC = () => {
  const { id } = useParams();

  return (
    <Page>
      <Inbox />
      {id ? <Chat conversationId={id} /> : <EmptyChat />}
    </Page>
  );
};

export default DirectPage;

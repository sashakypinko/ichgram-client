import { FC } from 'react';
import Page from '@shared/components/page';
import Feed from '@features/feed';

const FeedPage: FC = () => {
  return (
    <Page>
      <Feed />
    </Page>
  );
};

export default FeedPage;

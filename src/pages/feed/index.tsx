import { FC } from 'react';
import Page from '@shared/components/page';
import Feed from '@features/feed';
import { Container } from '@mui/material';

const FeedPage: FC = () => {
  return (
    <Page>
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <Feed />
      </Container>
    </Page>
  );
};

export default FeedPage;
import { FC } from 'react';
import { Container } from '@mui/material';
import Trending from '@features/trending';
import Page from '@shared/components/page';

const ExplorePage: FC = () => {
  return (
    <Page>
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <Trending />
      </Container>
    </Page>
  );
};

export default ExplorePage;

import { FC } from 'react';
import Page from '@shared/components/page';
import { Container } from '@mui/material';

const EditProfilePage: FC = () => {
  return (
    <Page direction="column">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        Edit Profile
      </Container>
    </Page>
  );
};

export default EditProfilePage;

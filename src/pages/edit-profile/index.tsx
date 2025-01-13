import { FC } from 'react';
import Page from '@shared/components/page';
import { Container, Typography } from '@mui/material';
import ProfileForm from '@features/profile/components/profile-form';

const EditProfilePage: FC = () => {
  return (
    <Page direction="column">
      <Container sx={{ py: 4 }} maxWidth="md">
        <Typography sx={{ mb: 4 }} variant="h3">
          Edit profile
        </Typography>
        <ProfileForm />
      </Container>
    </Page>
  );
};

export default EditProfilePage;

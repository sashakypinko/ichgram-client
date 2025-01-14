import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import Page from '@shared/components/page';
import ProfileForm from '@features/profile/components/profile-form';
import BackButton from '@shared/components/back-button';
import { RouteEnum } from '@app/routes/enums/route.enum';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

const EditProfilePage: FC = () => {
  const navigate = useNavigate();
  const isSm = useIsBreakpoint(Breakpoint.SM);

  return (
    <Page direction="column">
      <Container sx={{ pt: isSm ? 10 : 4 }} maxWidth="md">
        <Box marginBottom={2} display="flex" alignItems="center" gap={2}>
          <BackButton onClick={() => navigate(RouteEnum.OWN_PROFILE)} />
          <Typography variant="h3">Edit profile</Typography>
        </Box>
        <ProfileForm />
      </Container>
    </Page>
  );
};

export default EditProfilePage;

import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { RouteEnum } from '@app/routes/enums/route.enum';
import BorderedBox from '@features/auth/components/bordered-box';
import Link from '@shared/components/link';

const SignUpLinkCard: FC = () => {
  return (
    <BorderedBox>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="subtitle2">Don&apos;t have an account?</Typography>
        <Link to={RouteEnum.SIGN_UP}>Sign up</Link>
      </Box>
    </BorderedBox>
  );
};

export default SignUpLinkCard;

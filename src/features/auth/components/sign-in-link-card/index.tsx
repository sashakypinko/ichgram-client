import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { RouteEnum } from '@app/routes/enums/route.enum';
import Link from '@shared/components/link';
import BorderedBox from '../bordered-box';

interface Props {
  title?: string;
}

const SignInLinkCard: FC<Props> = ({ title = 'Have an account?' }) => {
  return (
    <BorderedBox>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="subtitle2">{title}</Typography>
        <Link to={RouteEnum.SIGN_IN}>Log in</Link>
      </Box>
    </BorderedBox>
  );
};

export default SignInLinkCard;

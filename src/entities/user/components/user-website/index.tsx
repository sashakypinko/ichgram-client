import { FC } from 'react';
import { IUser } from '@entities/user/model/user';
import { Box, Link, styled } from '@mui/material';
import { Link as LinkIcon } from '@shared/components/icons';

const StyledLink = styled(Link)({
  color: '#00376B',
  textDecoration: 'none',
});

interface Props {
  user: IUser;
}

const UserWebsite: FC<Props> = ({ user }) => {
  if (!user.website.length) return null;

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <LinkIcon />
      <StyledLink href={user.website} target="_blank">
        {user.website}
      </StyledLink>
    </Box>
  );
};

export default UserWebsite;

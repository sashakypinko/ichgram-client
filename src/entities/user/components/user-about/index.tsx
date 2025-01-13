import { FC, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { IUser } from '@entities/user/model/user';
import { shortenString } from '@shared/helpers/string-helper';

interface Props {
  user: IUser;
}

const UserAbout: FC<Props> = ({ user }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const theme = useTheme();

  if (!user.about.length) return null;

  return (
    <Box>
      <Typography>{showMore ? user.about : shortenString(user.about, 120)}</Typography>
      {user.about.length > 120 && (
        <Typography
          sx={{ cursor: 'pointer' }}
          color={theme.palette.text.secondary}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'less' : 'more'}
        </Typography>
      )}
    </Box>
  );
};

export default UserAbout;

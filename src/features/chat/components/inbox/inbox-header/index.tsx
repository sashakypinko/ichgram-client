import { FC } from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { DriveFileRenameOutlineRounded } from '@mui/icons-material';
import { useAppDispatch } from '@app/hooks';
import { openNewConversationDialog } from '@entities/conversation/store/slice';

const Header = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

interface Props {
  minified?: boolean;
}

const InboxHeader: FC<Props> = ({ minified }) => {
  const authUser = useAuthUser();
  const dispatch = useAppDispatch();

  return (
    <Header sx={{ px: 2, py: 2 }}>
      {!minified && (
        <Typography sx={{ ml: 2 }} variant="h4" fontWeight={700}>
          {authUser?.username}
        </Typography>
      )}
      <IconButton color="inherit" onClick={() => dispatch(openNewConversationDialog())}>
        <DriveFileRenameOutlineRounded fontSize="large" />
      </IconButton>
    </Header>
  );
};

export default InboxHeader;

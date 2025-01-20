import { FC } from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { ArrowBackIosNewRounded, ArrowForwardIosRounded, DriveFileRenameOutlineRounded } from '@mui/icons-material';
import { useAppDispatch } from '@app/hooks';
import { openNewConversationDialog } from '@entities/conversation/store/slice';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

const Header = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

interface Props {
  minified: boolean;
  onMinifiedChange: (newValue: boolean) => void;
}

const InboxHeader: FC<Props> = ({ minified, onMinifiedChange }) => {
  const authUser = useAuthUser();
  const dispatch = useAppDispatch();
  const isMd = useIsBreakpoint(Breakpoint.MD);

  const ArrowIcon = minified ? ArrowForwardIosRounded : ArrowBackIosNewRounded;

  return (
    <Header sx={{ p: minified ? 1 : 2 }}>
      <Box display="flex" alignItems="center">
        {!isMd && (
          <IconButton color="inherit" onClick={() => onMinifiedChange(!minified)}>
            <ArrowIcon />
          </IconButton>
        )}
        {!minified && (
          <Typography sx={{ ml: 2 }} variant="h4" fontWeight={700}>
            {authUser?.username}
          </Typography>
        )}
      </Box>
      <IconButton color="inherit" onClick={() => dispatch(openNewConversationDialog())}>
        <DriveFileRenameOutlineRounded fontSize={minified ? 'inherit' : 'large'} />
      </IconButton>
    </Header>
  );
};

export default InboxHeader;

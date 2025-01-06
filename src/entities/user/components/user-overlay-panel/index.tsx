import { FC } from 'react';
import OverlayPanel from '@shared/components/overlay-panel';
import useUserOverlay from '@entities/user/hooks/use-user-overlay.hook';
import UserSearch from '@entities/user/components/user-search';
import { Box } from '@mui/material';
import { useAppSelector } from '@app/hooks';
import { selectUser } from '@entities/user/store/selectors';
import UserList from '@entities/user/components/user-list';
import MessageUserAction from '@entities/user/components/user-actions/message-user-action';

const UserOverlayPanel: FC = () => {
  const { opened, hide } = useUserOverlay();
  const { searchedUsers } = useAppSelector(selectUser);

  return (
    <OverlayPanel opened={opened} title="Search" onClose={hide}>
      <Box sx={{ py: 4 }}>
        <UserSearch />
      </Box>
      <UserList users={searchedUsers} hoverActions={[MessageUserAction]} />
    </OverlayPanel>
  );
};

export default UserOverlayPanel;

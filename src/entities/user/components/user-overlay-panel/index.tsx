import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import OverlayPanel from '@shared/components/overlay-panel';
import useUserOverlay from '@entities/user/hooks/use-user-overlay.hook';
import UserList from '@entities/user/components/user-list';
import MessageUserAction from '@entities/user/components/user-actions/message-user-action';
import SearchField from '@shared/components/search-field';
import usePaginatedSearchedUsers from '@entities/user/hooks/use-paginated-searched-users.hook';
import { useAppDispatch } from '@app/hooks';
import { clearSearchedUsers } from '@entities/user/store/slice';

const UserOverlayPanel: FC = () => {
  const [search, setSearch] = useState<string>('');

  const { opened, hide } = useUserOverlay();
  const { data, next } = usePaginatedSearchedUsers(search, opened);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!opened) {
      dispatch(clearSearchedUsers());
      setSearch('');
    }
  }, [opened]);

  return (
    <OverlayPanel opened={opened} title="Search" onClose={hide} onScrollBottom={next}>
      {opened && (
        <Box sx={{ py: 1 }}>
          <SearchField onSearch={setSearch} />
        </Box>
      )}
      <UserList users={data} hoverActions={[MessageUserAction]} />
    </OverlayPanel>
  );
};

export default UserOverlayPanel;

import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import OverlayPanel from '@shared/components/overlay-panel';
import useUserOverlay from '@entities/user/hooks/use-user-overlay.hook';
import { selectUser } from '@entities/user/store/selectors';
import UserList from '@entities/user/components/user-list';
import MessageUserAction from '@entities/user/components/user-actions/message-user-action';
import usePagination from '@shared/hooks/use-pagination.hook';
import { searchUsers } from '@entities/user/store/slice';
import SearchField from '@shared/components/search-field';

const UserOverlayPanel: FC = () => {
  const [search, setSearch] = useState<string>('');

  const { opened, hide } = useUserOverlay();
  const { searchedUsers } = useAppSelector(selectUser);
  const { offset, limit, next, reset } = usePagination(20);
  const dispatch = useAppDispatch();

  const fetchUsers = () => {
    dispatch(searchUsers({ search, offset, limit }));
  };

  useEffect(() => {
    fetchUsers();
  }, [offset, limit, search]);

  useEffect(() => {
    if (!opened) {
      reset();
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
      <UserList users={searchedUsers} hoverActions={[MessageUserAction]} />
    </OverlayPanel>
  );
};

export default UserOverlayPanel;

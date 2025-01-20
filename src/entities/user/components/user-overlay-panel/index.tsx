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
import { generatePath, useNavigate } from 'react-router-dom';
import { RouteEnum } from '@app/routes/enums/route.enum.ts';
import { IUser } from '@entities/user/model/user.ts';

const UserOverlayPanel: FC = () => {
  const [search, setSearch] = useState<string>('');

  const { opened, hide } = useUserOverlay();
  const { data, next } = usePaginatedSearchedUsers(search, opened);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onUserClick = (user: IUser) => {
    hide();
    navigate(generatePath(RouteEnum.PROFILE, { username: user?.username || '' }));
  };

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
      <UserList
        users={data}
        hoverActions={[MessageUserAction]}
        onClick={onUserClick}
        emptyMessage="No account found."
      />
    </OverlayPanel>
  );
};

export default UserOverlayPanel;

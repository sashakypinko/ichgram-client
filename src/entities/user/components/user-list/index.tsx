import { FC } from 'react';
import { List, styled, Typography, useTheme } from '@mui/material';
import { IUser } from '@entities/user/model/user';
import UserItem from '@entities/user/components/user-list/user-item';
import { UserAction } from '@entities/user/types';

const UserListContainer = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

interface Props {
  users: IUser[];
  onClick?: (user: IUser) => void;
  actions?: UserAction[];
  hoverActions?: UserAction[];
  minHeight?: number;
  emptyMessage?: string;
}

const UserList: FC<Props> = ({ users, onClick, actions, hoverActions, minHeight, emptyMessage }) => {
  const theme = useTheme();

  return (
    <UserListContainer sx={{ minHeight }}>
      {!users.length && emptyMessage && (
        <Typography sx={{ p: 2 }} color={theme.palette.text.secondary}>
          {emptyMessage}
        </Typography>
      )}
      {users.map((user) => (
        <UserItem
          key={user._id}
          user={user}
          onClick={onClick ? () => onClick(user) : undefined}
          actions={actions}
          hoverActions={hoverActions}
        />
      ))}
    </UserListContainer>
  );
};

export default UserList;

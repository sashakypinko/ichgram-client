import { FC, useState } from 'react';
import { Box, ListItem, ListItemAvatar, ListItemButton, Typography } from '@mui/material';
import UserAvatar from '@entities/user/components/user-avatar';
import { IUser } from '@entities/user/model/user';
import { UserAction } from '@entities/user/types';

interface Props {
  user: IUser;
  onClick?: () => void;
  actions?: UserAction[];
  hoverActions?: UserAction[];
}

const UserItem: FC<Props> = ({ user, onClick, actions = [], hoverActions = [] }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <ListItem sx={{ p: 0 }} onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <ListItemButton sx={{ borderRadius: 2 }} onClick={onClick}>
        <ListItemAvatar>
          <UserAvatar user={user} size={42} />
        </ListItemAvatar>
        <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontWeight={700}>{user.username}</Typography>
          <Box display="flex" alignItems="center">
            {hovered &&
              hoverActions.map((Action: UserAction, index: number) => <Action key={index} user={user} asIcon />)}
            {actions.map((Action: UserAction, index: number) => (
              <Action key={index} user={user} asIcon />
            ))}
          </Box>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default UserItem;

import { FC, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade, IconButton, Menu } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import Button from '@shared/components/button';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectConversation } from '@entities/conversation/store/selectors';
import { ConversationParticipantRole, ConversationType } from '@entities/conversation/enums/conversation.enum';
import useParticipantRole from '@entities/conversation/hooks/use-participant-role.hook';
import { leaveConversation, deleteConversation } from '@entities/conversation/store/slice';
import { RouteEnum } from '@app/routes/enums/route.enum';

const ManageChatMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentConversation, loading } = useAppSelector(selectConversation);
  const dispatch = useAppDispatch();
  const role = useParticipantRole(currentConversation);
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLeave = () => {
    if (currentConversation) {
      dispatch(
        leaveConversation({
          payload: currentConversation._id,
          onSuccess: () => navigate(RouteEnum.DIRECT),
        }),
      );
    }
  };

  const handleDelete = () => {
    if (currentConversation) {
      dispatch(
        deleteConversation({
          payload: currentConversation._id,
          onSuccess: () => navigate(RouteEnum.DIRECT),
        }),
      );
    }
  };

  if (!currentConversation) {
    return null;
  }

  const open = Boolean(anchorEl);
  const isGroup = currentConversation.type === ConversationType.GROUP;

  return (
    <>
      <IconButton color="inherit" size="large" onClick={handleClick}>
        <InfoOutlined fontSize="large" />
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'fade-button',
          sx: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {isGroup && (
          <Button color="error" onClick={handleLeave} loading={loading}>
            Leave chat
          </Button>
        )}
        {(!isGroup || role === ConversationParticipantRole.ADMIN) && (
          <Button color="error" onClick={handleDelete} loading={loading}>
            Delete chat
          </Button>
        )}
      </Menu>
    </>
  );
};

export default ManageChatMenu;

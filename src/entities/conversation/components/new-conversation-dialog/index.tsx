import { ChangeEvent, FC, useState } from 'react';
import Dialog from '@shared/components/dialog';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectConversation } from '@entities/conversation/store/selectors';
import { closeNewConversationDialog, createConversation } from '@entities/conversation/store/slice';
import Button from '@shared/components/button';
import { Box, Divider, styled, Typography } from '@mui/material';
import UserList from '@entities/user/components/user-list';
import { selectUser } from '@entities/user/store/selectors';
import UserMultiSearch from '@entities/user/components/user-multi-search';
import { IUser } from '@entities/user/model/user';
import { RadioButtonUnchecked, CheckCircleRounded } from '@mui/icons-material';
import { ConversationType } from '@entities/conversation/enums/conversation.enum';
import { IConversation } from '@entities/conversation/model/conversation';
import { generatePath, useNavigate } from 'react-router-dom';
import { RouteEnum } from '@app/routes/enums/route.enum';
import Input from '@shared/components/input';
import { clearSearchedUsers } from '@entities/user/store/slice';

const ActionContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 16,
});

const NewConversationDialog: FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [title, setTitle] = useState<string>('');
  const { newConversationDialogOpened, loading } = useAppSelector(selectConversation);
  const { users } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(closeNewConversationDialog());
    dispatch(clearSearchedUsers());
    setSelectedUsers([]);
  };

  const handleSelectChange = (user: IUser) => {
    const selectedUserIdx = selectedUsers.findIndex(({ _id }) => user._id === _id);

    if (selectedUserIdx === -1) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers([...selectedUsers.slice(0, selectedUserIdx), ...selectedUsers.slice(selectedUserIdx + 1)]);
    }
    dispatch(clearSearchedUsers());
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCreateConversation = () => {
    dispatch(
      createConversation({
        payload: {
          type: selectedUsers.length > 1 ? ConversationType.GROUP : ConversationType.PRIVATE,
          participants: selectedUsers.map(({ _id }) => _id),
          title,
        },
        onSuccess: ({ _id }: IConversation) => {
          handleClose();
          navigate(generatePath(RouteEnum.DIRECT_CONVERSATION, { id: _id }));
        },
      }),
    );
  };

  return (
    <Dialog open={newConversationDialogOpened} title="New message" onClose={handleClose}>
      <Box sx={{ px: 2 }} display="flex" alignItems="center" gap={2}>
        <Typography fontSize={16} fontWeight={600}>
          To:
        </Typography>
        <UserMultiSearch selected={selectedUsers} onChange={setSelectedUsers} />
      </Box>
      <Divider />
      <UserList
        users={users.data}
        onClick={handleSelectChange}
        minHeight={600}
        emptyMessage="No account found."
        actions={[
          ({ user }) => {
            const isSelected = !!selectedUsers.find((selectedUser) => user._id === selectedUser._id);
            const Icon = isSelected ? CheckCircleRounded : RadioButtonUnchecked;
            const color = isSelected ? 'primary' : 'inherit';

            return <Icon color={color} fontSize="large" />;
          },
        ]}
      />
      <ActionContainer>
        {selectedUsers.length > 1 && <Input onChange={handleTitleChange} placeholder="Chat title" fullWidth />}
        <Button
          sx={{ py: 1 }}
          variant="contained"
          disabled={!selectedUsers.length || (selectedUsers.length > 1 && !title)}
          onClick={handleCreateConversation}
          loading={loading}
          fullWidth
        >
          Chat
        </Button>
      </ActionContainer>
    </Dialog>
  );
};

export default NewConversationDialog;

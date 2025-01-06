import { FC, useRef } from 'react';
import { Box, styled } from '@mui/material';
import { useAppSelector } from '@app/hooks';
import UserList from '@entities/user/components/user-list';
import { selectUser } from '@entities/user/store/selectors';
import FollowUserAction from '@entities/user/components/user-actions/follow-user-action';
import Dialog from '@shared/components/dialog';
import Breakpoint from '@shared/enums/breakpoint.enum';

const ScrollableContainer = styled(Box)({
  height: 600,
  overflowY: 'auto',
});

interface Props {
  title: string;
  opened: boolean;
  onClose: () => void;
  onScrollBottom: () => void;
}

const UserListDialog: FC<Props> = ({ title, opened, onClose, onScrollBottom }) => {
  const { searchedUsers } = useAppSelector(selectUser);
  const userListContainerRef = useRef<HTMLDivElement>();

  const handleScroll = () => {
    if (userListContainerRef.current) {
      if (
        userListContainerRef.current.scrollTop ===
        userListContainerRef.current.scrollHeight - userListContainerRef.current.offsetHeight
      ) {
        onScrollBottom();
      }
    }
  };

  return (
    <Dialog maxWidth={Breakpoint.XS} open={opened} title={title} onClose={onClose}>
      <ScrollableContainer ref={userListContainerRef} onScroll={handleScroll}>
        <UserList users={searchedUsers} actions={[FollowUserAction]} />
      </ScrollableContainer>
    </Dialog>
  );
};

export default UserListDialog;

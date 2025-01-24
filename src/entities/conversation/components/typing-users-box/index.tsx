import { FC } from 'react';
import { Box, styled, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@app/hooks';
import { selectConversation } from '@entities/conversation/store/selectors';
import { IUser } from '@entities/user/model/user';

const StyledBox = styled(Box)({
  padding: '0 24px',
  background: 'transparent',
});

const TypingUsersBox: FC = () => {
  const { typingUsers, currentConversation } = useAppSelector(selectConversation);
  const theme = useTheme();

  if (!currentConversation) {
    return null;
  }

  const users: IUser[] = typingUsers[currentConversation._id] || [];

  if (!users.length) {
    return null;
  }

  const typingUsersString = users.map(({ fullName }) => fullName).join(', ');

  return (
    <StyledBox>
      <Typography variant="body2" color={theme.palette.text.secondary}>
        {typingUsersString} typing...
      </Typography>
    </StyledBox>
  );
};

export default TypingUsersBox;

import { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import image from '@assets/img/message.svg';
import Button from '@shared/components/button';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectConversation } from '@entities/conversation/store/selectors';
import { openNewConversationDialog } from '@entities/conversation/store/slice';

const NewConversationCard: FC = () => {
  const theme = useTheme();
  const { loading } = useAppSelector(selectConversation);
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <img src={image} alt="message" />
      <Typography variant="h4">Your messages</Typography>
      <Typography color={theme.palette.text.secondary}>Send a message to start a chat.</Typography>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() => dispatch(openNewConversationDialog())}
        loading={loading}
      >
        Send message
      </Button>
    </Box>
  );
};

export default NewConversationCard;

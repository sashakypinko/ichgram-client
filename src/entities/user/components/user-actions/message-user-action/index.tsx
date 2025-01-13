import { IconButton } from '@mui/material';
import { Message } from '@shared/components/icons';
import { UserAction } from '@entities/user/types';
import { createConversation } from '@entities/conversation/store/slice';
import { ConversationType } from '@entities/conversation/enums/conversation.enum';
import { IConversation } from '@entities/conversation/model/conversation';
import { generatePath, useNavigate } from 'react-router-dom';
import { RouteEnum } from '@app/routes/enums/route.enum';
import useUserOverlay from '@entities/user/hooks/use-user-overlay.hook';
import { useAppDispatch } from '@app/hooks';
import Button from '@shared/components/button';
import VisibleForVisitor from '@entities/user/hoc/visible-for-visitor.hoc';

const MessageUserAction: UserAction = ({ user, asIcon }) => {
  const { opened, hide } = useUserOverlay();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateConversation = () => {
    dispatch(
      createConversation({
        payload: {
          type: ConversationType.PRIVATE,
          participants: [user._id],
        },
        onSuccess: ({ _id }: IConversation) => {
          opened && hide();
          navigate(generatePath(RouteEnum.DIRECT_CONVERSATION, { id: _id }));
        },
      }),
    );
  };

  if (asIcon) {
    return (
      <IconButton onClick={handleCreateConversation}>
        <Message />
      </IconButton>
    );
  }

  return (
    <Button variant="contained" color="inherit" onClick={handleCreateConversation}>
      Message
    </Button>
  );
};

export default VisibleForVisitor(MessageUserAction);

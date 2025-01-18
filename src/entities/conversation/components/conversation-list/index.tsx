import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { List, Typography, useTheme } from '@mui/material';
import { selectConversation } from '@entities/conversation/store/selectors';
import { IConversation } from '@entities/conversation/model/conversation';
import ConversationItem from '@entities/conversation/components/conversation-list/conversation-item';
import { setEditingMessage, setReplyingMessage } from '@entities/message/store/slice';
import { generatePath, useNavigate } from 'react-router-dom';
import { RouteEnum } from '@app/routes/enums/route.enum';

interface Props {
  minified?: boolean;
  emptyMessage?: string;
}

const ConversationList: FC<Props> = ({ minified, emptyMessage }) => {
  const { conversations, currentConversation } = useAppSelector(selectConversation);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSelectChat = (conversation: IConversation) => {
    dispatch(setEditingMessage(null));
    dispatch(setReplyingMessage(null));
    navigate(generatePath(RouteEnum.DIRECT_CONVERSATION, { id: conversation._id }));
  };

  return (
    <List>
      {!conversations.length && emptyMessage && (
        <Typography sx={{ p: 2 }} textAlign="center" color={theme.palette.text.secondary}>
          {emptyMessage}
        </Typography>
      )}
      {conversations.map((conversation: IConversation) => (
        <ConversationItem
          key={conversation._id}
          conversation={conversation}
          isActive={currentConversation?._id === conversation._id}
          onSelect={() => handleSelectChat(conversation)}
          minified={minified}
        />
      ))}
    </List>
  );
};

export default ConversationList;

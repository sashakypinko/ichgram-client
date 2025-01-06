import { FC } from 'react';
import { Badge, ListItem, ListItemAvatar, ListItemButton } from '@mui/material';
import { IConversation } from '@entities/conversation/model/conversation';
import ConversationImage from '@entities/conversation/components/conversation-image';
import useCorrespondent from '@entities/conversation/hooks/use-correspondent.hook';
import Content from '@entities/conversation/components/conversation-list/conversation-item/content';

interface Props {
  conversation: IConversation;
  isActive: boolean;
  onSelect: () => void;
  minified?: boolean;
}

const ConversationItem: FC<Props> = ({ conversation, isActive, onSelect, minified }) => {
  const correspondent = useCorrespondent(conversation);

  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton
        sx={{ px: minified ? 1 : 4, gap: 3, background: isActive ? '#EFEFEF' : 'none' }}
        onClick={onSelect}
      >
        <ListItemAvatar sx={{ display: 'flex' }}>
          <ConversationImage conversation={conversation} />
        </ListItemAvatar>
        {!minified && (
          <Content title={conversation.title || correspondent?.fullName || ''} lastMessage={conversation.lastMessage} />
        )}
        {conversation.hasUnread && <Badge color="primary" variant="dot" badgeContent=" " />}
      </ListItemButton>
    </ListItem>
  );
};

export default ConversationItem;

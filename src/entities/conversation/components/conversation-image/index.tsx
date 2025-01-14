import { FC } from 'react';
import { Box, styled } from '@mui/material';
import UserAvatar from '@entities/user/components/user-avatar';
import { IConversation } from '@entities/conversation/model/conversation';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';

const MoreCircle = styled(Box)({
  borderRadius: '50%',
  border: '1px solid #d0d0d0',
  background: '#e8e8e8',
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 16,
  fontWeight: 600,
});

interface Props {
  conversation: IConversation;
  size?: number;
  maxItems?: number;
}

const ConversationImage: FC<Props> = ({ conversation, size = 64, maxItems = 3 }) => {
  const authUser = useAuthUser();

  const filteredParticipants = conversation.participants
    .filter(({ user }) => user._id !== authUser?._id)
    .slice(0, maxItems);

  const participantsLeft = conversation.participants.length - maxItems;

  const avatarSize = size - (filteredParticipants.length - 1) * 12;
  const overlapOffset = 12;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: `${size}px`,
      }}
    >
      {filteredParticipants.map(({ user }, index) => (
        <Box
          key={user._id}
          sx={{
            position: 'absolute',
            left: `${index * overlapOffset}px`,
          }}
        >
          {index === maxItems - 1 && participantsLeft > 0 ? (
            <MoreCircle>+{participantsLeft}</MoreCircle>
          ) : (
            <UserAvatar user={user} size={avatarSize} withoutLink />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ConversationImage;

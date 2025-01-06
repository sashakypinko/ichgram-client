import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { IConversation } from '@entities/conversation/model/conversation';
import { ConversationParticipantRole } from '@entities/conversation/enums/conversation.enum';

const useParticipantRole = (conversation: IConversation | null): ConversationParticipantRole | null => {
  const authUser = useAuthUser();

  if (!conversation) {
    return null;
  }

  return conversation.participants.find(({ user }) => authUser?._id === user._id)?.role || null;
};

export default useParticipantRole;

import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { IConversation } from '@entities/conversation/model/conversation';
import { IUser } from '@entities/user/model/user';

const useCorrespondent = (conversation: IConversation | null): IUser | null => {
  const authUser = useAuthUser();

  if (!conversation) {
    return null;
  }

  return conversation.participants.find(({ user }) => authUser?._id !== user._id)?.user || null;
};

export default useCorrespondent;

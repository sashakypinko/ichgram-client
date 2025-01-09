import { useAppSelector } from '@app/hooks';
import { selectConversation } from '@entities/conversation/store/selectors';

const useUnreadMessagesCount = (): number => {
  const { conversations } = useAppSelector(selectConversation);

  return conversations.filter(({ hasUnread }) => hasUnread).length;
};

export default useUnreadMessagesCount;

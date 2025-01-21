import { IConversation } from '@entities/conversation/model/conversation';
import { IUser } from '@entities/user/model/user';

export interface ConversationState {
  conversations: IConversation[];
  typingUsers: { [key: string]: IUser[] };
  currentConversation: IConversation | null;
  newConversationDialogOpened: boolean;
  loading: boolean;
  error: string | null;
}

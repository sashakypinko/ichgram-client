import { IConversation } from '@entities/conversation/model/conversation';

export interface ConversationState {
  conversations: IConversation[];
  currentConversation: IConversation | null;
  newConversationDialogOpened: boolean;
  loading: boolean;
  error: string | null;
}

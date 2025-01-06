import { ConversationType } from '@entities/conversation/enums/conversation.enum';

export interface CreateConversationData {
  type: ConversationType;
  title?: string;
  participants: string[];
}

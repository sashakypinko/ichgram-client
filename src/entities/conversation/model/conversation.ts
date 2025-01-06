import { ConversationParticipantRole, ConversationType } from '@entities/conversation/enums/conversation.enum';
import { IUser } from '@entities/user/model/user';
import { IMessage } from '@entities/message/model/message';

export type Participant = {
  userId: string;
  joinedAt: Date;
  role: ConversationParticipantRole;
  user: IUser;
};

export interface IConversation {
  _id: string;
  type: ConversationType;
  title?: string;
  participants: Participant[];
  hasUnread: boolean;
  createdAt: Date;
  lastMessage?: IMessage;
}

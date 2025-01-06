import { IUser } from '@entities/user/model/user';

export interface IMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  mediaId?: string;
  sentAt: Date;
  readBy: string[];
  edited: boolean;
  repliedTo?: string;
  forwardedFrom?: string;
  repliedMessage: IMessage | null;
  forwardedMessage: IMessage | null;
  sender: IUser;
}

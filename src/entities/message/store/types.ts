import { IMessage } from '@entities/message/model/message';

export type Messages = { [key: string]: IMessage[] };

export interface MessageState {
  messages: Messages;
  editingMessage: IMessage | null;
  replyingMessage: IMessage | null;
  loading: boolean;
  sending: boolean;
  error: string | null;
}

export interface ExcludeMessageData {
  conversationId: string;
  message: IMessage;
}

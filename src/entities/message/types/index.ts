export interface GetMessagesParams {
  conversationId: string;
  offset?: number;
}

export interface SendMessageData {
  conversationId: string;
  content: string;
  media?: File;
  repliedTo?: string;
  forwardedFrom?: string;
}

export interface UpdateMessageData {
  messageId: string;
  content: string;
}

import { RootState } from '@app/store';
import { ConversationState } from '@entities/conversation/store/types';

export const selectConversation = (state: RootState): ConversationState => state.conversation;

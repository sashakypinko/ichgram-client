import { RootState } from '@app/store';
import { MessageState } from '@entities/message/store/types';

export const selectMessage = (state: RootState): MessageState => state.message;

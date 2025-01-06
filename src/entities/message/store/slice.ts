import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MessageApi } from '../services/message-service';
import { GetMessagesParams, SendMessageData, UpdateMessageData } from '../types';
import { MessageState } from './types';
import { IMessage } from '@entities/message/model/message';
import { ActionWithCallbacks } from '@app/store';
import { getConversations } from '@entities/conversation/store/slice';

const initialState: MessageState = {
  messages: {},
  editingMessage: null,
  replyingMessage: null,
  loading: false,
  sending: false,
  error: null,
};

export const getMessages = createAsyncThunk<
  { messages: IMessage[]; conversationId: string },
  ActionWithCallbacks<GetMessagesParams>
>('message/get', async ({ payload, onSuccess }, { rejectWithValue }) => {
  try {
    const messages = await MessageApi.getMessages(payload);
    if (onSuccess) onSuccess();
    return { messages, conversationId: payload.conversationId };
  } catch (error: unknown) {
    return rejectWithValue('Failed to get messages');
  }
});

export const sendMessage = createAsyncThunk<IMessage, ActionWithCallbacks<SendMessageData>>(
  'message/send',
  async ({ payload, onSuccess }, { rejectWithValue, dispatch }) => {
    try {
      const message = await MessageApi.send(payload);
      dispatch(addMessage(message));
      dispatch(getConversations());
      if (onSuccess) onSuccess();
      return message;
    } catch (error: unknown) {
      return rejectWithValue('Failed to send message');
    }
  },
);

export const updateMessage = createAsyncThunk<IMessage, ActionWithCallbacks<UpdateMessageData>>(
  'message/update',
  async ({ payload, onSuccess }, { rejectWithValue, dispatch }) => {
    try {
      const updatedMessage = await MessageApi.update(payload);
      dispatch(replaceMessage(updatedMessage));
      if (onSuccess) onSuccess();
      return updatedMessage;
    } catch (error: unknown) {
      return rejectWithValue('Failed to update message');
    }
  },
);

export const deleteMessage = createAsyncThunk<IMessage, IMessage>(
  'message/delete',
  async (message, { rejectWithValue, dispatch }) => {
    try {
      const deletedMessage = await MessageApi.remove(message._id);

      dispatch(excludeMessage(message));
      dispatch(getConversations());

      return deletedMessage;
    } catch (error: unknown) {
      return rejectWithValue('Failed to delete message');
    }
  },
);

export const markMessageAsRead = createAsyncThunk<IMessage, string>(
  'message/markAsRead',
  async (messageId, { rejectWithValue, dispatch }) => {
    try {
      const updatedMessage = await MessageApi.markAsRead(messageId);

      dispatch(replaceMessage(updatedMessage));
      dispatch(getConversations());

      return updatedMessage;
    } catch (error: unknown) {
      return rejectWithValue('Failed to mark message as read');
    }
  },
);

const slice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state: MessageState, action: PayloadAction<IMessage>) => {
      if (!state.messages[action.payload.conversationId]) {
        state.messages[action.payload.conversationId] = [];
      }
      state.messages[action.payload.conversationId].unshift(action.payload);
    },
    replaceMessage: (state: MessageState, action: PayloadAction<IMessage>) => {
      state.messages[action.payload.conversationId] = state.messages[action.payload.conversationId]?.map((msg) => {
        if (msg._id === action.payload._id) {
          return action.payload;
        }
        return msg;
      });
    },
    excludeMessage: (state: MessageState, action: PayloadAction<IMessage>) => {
      state.messages[action.payload.conversationId] = state.messages[action.payload.conversationId].filter(
        (message) => message._id !== action.payload._id,
      );
    },
    setEditingMessage: (state: MessageState, action: PayloadAction<IMessage | null>) => {
      state.replyingMessage = null;
      state.editingMessage = action.payload;
    },
    setReplyingMessage: (state: MessageState, action: PayloadAction<IMessage | null>) => {
      state.editingMessage = null;
      state.replyingMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state: MessageState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getMessages.fulfilled,
        (
          state: MessageState,
          action: PayloadAction<{
            messages: IMessage[];
            conversationId: string;
          }>,
        ) => {
          state.loading = false;
          state.messages[action.payload.conversationId] = [
            ...(state.messages[action.payload.conversationId] || []),
            ...action.payload.messages,
          ];
        },
      )
      .addCase(getMessages.rejected, (state: MessageState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(sendMessage.pending, (state: MessageState) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state: MessageState) => {
        state.sending = false;
        state.replyingMessage = null;
      })
      .addCase(sendMessage.rejected, (state: MessageState, action: PayloadAction<unknown>) => {
        state.sending = false;
        state.error = action.payload as string;
      })

      .addCase(updateMessage.pending, (state: MessageState) => {
        state.error = null;
      })

      .addCase(updateMessage.fulfilled, (state: MessageState) => {
        state.editingMessage = null;
        state.error = null;
      })
      .addCase(updateMessage.rejected, (state: MessageState, action: PayloadAction<unknown>) => {
        state.error = action.payload as string;
      })

      .addCase(deleteMessage.pending, (state: MessageState) => {
        state.error = null;
      })
      .addCase(deleteMessage.rejected, (state: MessageState, action: PayloadAction<unknown>) => {
        state.error = action.payload as string;
      })

      .addCase(markMessageAsRead.pending, (state: MessageState) => {
        state.error = null;
      })
      .addCase(markMessageAsRead.rejected, (state: MessageState, action: PayloadAction<unknown>) => {
        state.error = action.payload as string;
      });
  },
});

export const { addMessage, excludeMessage, replaceMessage, setEditingMessage, setReplyingMessage } = slice.actions;
export default slice.reducer;

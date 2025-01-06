import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ConversationState } from './types';
import { IConversation } from '@entities/conversation/model/conversation';
import { ConversationApi } from '@entities/conversation/services/conversation-service';
import { CreateConversationData } from '@entities/conversation/types';
import { ActionWithCallbacks } from '@app/store';

const initialState: ConversationState = {
  conversations: [],
  currentConversation: null,
  newConversationDialogOpened: false,
  loading: false,
  error: null,
};

export const getConversations = createAsyncThunk<IConversation[]>(
  'conversation/get',
  async (_, { rejectWithValue }) => {
    try {
      return ConversationApi.getAll();
    } catch (error: unknown) {
      return rejectWithValue('Failed to get conversations');
    }
  },
);

export const createConversation = createAsyncThunk<
  IConversation,
  ActionWithCallbacks<CreateConversationData, IConversation>
>('conversation/create', async ({ payload, onSuccess }, { rejectWithValue }) => {
  try {
    const conversation = await ConversationApi.create(payload);
    if (onSuccess) onSuccess(conversation);
    return conversation;
  } catch (error: unknown) {
    return rejectWithValue('Failed to create conversations');
  }
});

export const leaveConversation = createAsyncThunk<IConversation, ActionWithCallbacks<string>>(
  'conversation/leave',
  async ({ payload, onSuccess }, { rejectWithValue, dispatch }) => {
    try {
      const conversation = await ConversationApi.leave(payload);
      dispatch(getConversations());
      if (onSuccess) onSuccess();
      return conversation;
    } catch (error: unknown) {
      return rejectWithValue('Failed to leave conversation');
    }
  },
);

export const deleteConversation = createAsyncThunk<IConversation, ActionWithCallbacks<string>>(
  'conversation/delete',
  async ({ payload, onSuccess }, { rejectWithValue, dispatch }) => {
    try {
      const conversation = await ConversationApi.remove(payload);
      dispatch(getConversations());
      if (onSuccess) onSuccess();
      return conversation;
    } catch (error: unknown) {
      return rejectWithValue('Failed to remove conversation');
    }
  },
);

const slice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setCurrentConversation: (state: ConversationState, action: PayloadAction<IConversation>) => {
      state.currentConversation = action.payload;
    },
    openNewConversationDialog: (state: ConversationState) => {
      state.newConversationDialogOpened = true;
    },
    closeNewConversationDialog: (state: ConversationState) => {
      state.newConversationDialogOpened = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state: ConversationState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConversations.fulfilled, (state: ConversationState, action: PayloadAction<IConversation[]>) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state: ConversationState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createConversation.pending, (state: ConversationState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConversation.fulfilled, (state: ConversationState, action: PayloadAction<IConversation>) => {
        state.loading = false;
        if (!state.conversations.find(({ _id }) => action.payload._id === _id)) {
          state.conversations.unshift(action.payload);
        }
      })
      .addCase(createConversation.rejected, (state: ConversationState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(leaveConversation.pending, (state: ConversationState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(leaveConversation.fulfilled, (state: ConversationState, action: PayloadAction<IConversation>) => {
        state.loading = false;
        state.conversations = state.conversations.filter(({ _id }) => action.payload._id !== _id);
      })
      .addCase(leaveConversation.rejected, (state: ConversationState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteConversation.pending, (state: ConversationState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConversation.fulfilled, (state: ConversationState, action: PayloadAction<IConversation>) => {
        state.loading = false;
        state.conversations = state.conversations.filter(({ _id }) => action.payload._id !== _id);
      })
      .addCase(deleteConversation.rejected, (state: ConversationState, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentConversation, openNewConversationDialog, closeNewConversationDialog } = slice.actions;
export default slice.reducer;

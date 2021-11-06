import { createSlice } from '@reduxjs/toolkit';

import fetchChatData from '../actions/index.js';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      state.push(payload);
    },
  },
  extraReducers: {
    [fetchChatData.fulfilled](_state, { payload }) {
      return payload.messages;
    },
  },
});

export const { addMessage } = slice.actions;

export const selectCurrentMessageList = (state) => state.messages
  .filter(({ channelId }) => channelId === state.currentChannelId);

export default slice.reducer;

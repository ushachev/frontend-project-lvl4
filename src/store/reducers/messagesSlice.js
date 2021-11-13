import { createSlice } from '@reduxjs/toolkit';

import fetchChatData from '../actions/index.js';
import { removeChannel } from './channelsSlice.js';

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
    [removeChannel](state, { payload }) {
      return state.filter(({ channelId }) => channelId !== payload.id);
    },
  },
});

export const { addMessage } = slice.actions;

export const selectCurrentMessageList = (state) => state.messages
  .filter(({ channelId }) => channelId === state.activeChannelId.current);

export default slice.reducer;

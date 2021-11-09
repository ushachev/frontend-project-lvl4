import { createSlice } from '@reduxjs/toolkit';

import fetchChatData from '../actions/index.js';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, { payload }) {
      state.push(payload);
    },
  },
  extraReducers: {
    [fetchChatData.fulfilled](_state, { payload }) {
      return payload.channels;
    },
  },
});

export const { addChannel } = slice.actions;

export const selectChannelList = (state) => state.channels;

export const selectCurrentChannel = (state) => {
  const [channel = {}] = state.channels.filter(({ id }) => id === state.currentChannelId);
  return channel;
};

export default slice.reducer;

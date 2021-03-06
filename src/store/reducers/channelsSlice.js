import { createSlice } from '@reduxjs/toolkit';

import fetchChatData from '../actions/index.js';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, { payload }) {
      state.push(payload);
    },
    renameChannel(state, { payload }) {
      const channel = state.find(({ id }) => id === payload.id);
      channel.name = payload.name;
    },
    removeChannel(state, { payload }) {
      return state.filter(({ id }) => id !== payload.id);
    },
  },
  extraReducers: {
    [fetchChatData.fulfilled](_state, { payload }) {
      return payload.channels;
    },
  },
});

export const { addChannel, renameChannel, removeChannel } = slice.actions;

export const selectChannelList = (state) => state.channels;

export const selectCurrentChannel = (state) => {
  const [channel = {}] = state.channels.filter(({ id }) => id === state.activeChannelId.current);
  return channel;
};

export default slice.reducer;

/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';

import fetchChatData from '../actions/index.js';
import { removeChannel } from './channelsSlice.js';

const slice = createSlice({
  name: 'activeChannelId',
  initialState: { current: null, default: null },
  reducers: {
    setCurrentChannelId(state, { payload }) {
      state.current = payload;
    },
  },
  extraReducers: {
    [fetchChatData.fulfilled](state, { payload }) {
      state.current = payload.currentChannelId;
      state.default = payload.currentChannelId;
    },
    [removeChannel](state, { payload }) {
      if (payload.id === state.current) {
        state.current = state.default;
      }
    },
  },
});

export const { setCurrentChannelId } = slice.actions;

export const selectCurrentChannelId = (state) => state.activeChannelId.current;

export const selectDefaultChannelId = (state) => state.activeChannelId.default;

export default slice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import fetchChatData from '../actions/index.js';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    setCurrentChannelId: (_state, { payload }) => payload,
  },
  extraReducers: {
    [fetchChatData.fulfilled]: (_state, { payload }) => payload.currentChannelId,
  },
});

export const { setCurrentChannelId } = slice.actions;

export const selectCurrentChannelId = (state) => state.currentChannelId;

export default slice.reducer;

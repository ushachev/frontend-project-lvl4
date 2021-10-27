import { createSlice } from '@reduxjs/toolkit';

import fetchChatData from '../actions/index.js';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
  },
  extraReducers: {
    [fetchChatData.fulfilled](_state, { payload }) {
      return payload.channels;
    },
  },
});

export const selectChannelList = (state) => state.channels;

export default slice.reducer;

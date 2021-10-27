import { createSlice } from '@reduxjs/toolkit';

import fetchChatData from '../actions/index.js';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
  },
  extraReducers: {
    [fetchChatData.fulfilled](_state, { payload }) {
      return payload.messages;
    },
  },
});

export const selectMessageList = (state) => state.messages;

export default slice.reducer;

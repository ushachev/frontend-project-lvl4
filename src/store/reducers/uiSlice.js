import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ui',
  initialState: { channelList: 'scrollNone' },
  reducers: {
    setChannelListScroll: (state, { payload }) => {
      // eslint-disable-next-line
      state.channelList = payload;
    },
  },
});

export const { setChannelListScroll } = slice.actions;

export const selectUi = (state) => state.ui;

export default slice.reducer;

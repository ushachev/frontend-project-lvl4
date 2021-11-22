/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'socketStatus',
  initialState: { connected: false },
  reducers: {
    setSocketStatus(state, { payload }) {
      const properties = Object.keys(payload);
      properties.forEach((property) => {
        state[property] = payload[property];
      });
    },
  },
});

export const { setSocketStatus } = slice.actions;

export const selectSocketConnectedStatus = (state) => state.socketStatus.connected;

export default slice.reducer;

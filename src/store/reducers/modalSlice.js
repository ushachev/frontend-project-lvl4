import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: { type: null, item: null },
  reducers: {
    setModal: (_state, { payload: { type, item = null } }) => ({ type, item }),
  },
});

export const { setModal } = slice.actions;

export const selectModal = (state) => state.modal;

export default slice.reducer;

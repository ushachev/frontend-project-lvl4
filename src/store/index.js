import { configureStore } from '@reduxjs/toolkit';

import currentChannelIdReducer from './reducers/currentChannelSlice.js';
import channelsReducer from './reducers/channelsSlice.js';
import messagesReducer from './reducers/messagesSlice.js';
import modalReducer from './reducers/modalSlice.js';

const store = configureStore({
  reducer: {
    currentChannelId: currentChannelIdReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});

export default store;

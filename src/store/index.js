import { configureStore } from '@reduxjs/toolkit';

import activeChannelIdReducer from './reducers/activeChannelSlice.js';
import channelsReducer from './reducers/channelsSlice.js';
import messagesReducer from './reducers/messagesSlice.js';
import modalReducer from './reducers/modalSlice.js';

const store = configureStore({
  reducer: {
    activeChannelId: activeChannelIdReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});

export default store;

/* eslint-disable react/jsx-no-constructed-context-values */

import React from 'react';
import { Provider as RollbarProvider } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setLocale } from 'yup';
import { io } from 'socket.io-client';

import resources from './locales/index.js';
import store from '../store/index.js';
import { addMessage } from '../store/reducers/messagesSlice.js';
import { addChannel, renameChannel, removeChannel } from '../store/reducers/channelsSlice.js';
import { setSocketStatus } from '../store/reducers/socketStatusSlice.js';
import socketContext from '../contexts/socketContext.js';

import App from './App.jsx';

const defaultSocketClient = io({ autoConnect: false });

const init = (socket = defaultSocketClient) => {
  i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources,
    });

  setLocale({
    mixed: {
      required: { key: 'errors.validation.required' },
      notOneOf: ({ value }) => ({ key: 'errors.validation.notOneOf', values: { value } }),
    },
    string: {
      min: ({ min }) => ({ key: 'errors.validation.min', values: { count: min } }),
      max: ({ max }) => ({ key: 'errors.validation.max', values: { count: max } }),
    },
  });

  const rollbarConfig = {
    enabled: process.env.NODE_ENV === 'production',
    accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  const { dispatch } = store;
  socket.on('connect', () => {
    console.log('Chat: socket connected with id', socket.id);
    dispatch(setSocketStatus({ connected: true }));
  });
  socket.on('disconnect', () => {
    console.log('Chat: socket disconnected');
    dispatch(setSocketStatus({ connected: false }));
  });
  socket.on('newMessage', (message) => {
    console.log('Chat: new message added');
    dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    console.log('Chat: new channel added');
    dispatch(addChannel(channel));
  });
  socket.on('renameChannel', (channel) => {
    console.log('Chat: channel renamed');
    dispatch(renameChannel(channel));
  });
  socket.on('removeChannel', (channel) => {
    console.log('Chat: channel removed');
    dispatch(removeChannel(channel));
  });

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ReduxProvider store={store}>
        <socketContext.Provider value={{ socket }}>
          <App />
        </socketContext.Provider>
      </ReduxProvider>
    </RollbarProvider>
  );

  return vdom;
};

export default init;

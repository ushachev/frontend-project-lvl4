import React from 'react';
import { Provider as RollbarProvider } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setLocale } from 'yup';

import resources from './locales/index.js';
import store from '../store/index.js';
import socketContext from '../contexts/socketContext.js';

import App from './App.jsx';

const init = (socketClient) => {
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

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ReduxProvider store={store}>
        <socketContext.Provider value={{ socketClient }}>
          <App />
        </socketContext.Provider>
      </ReduxProvider>
    </RollbarProvider>
  );

  return vdom;
};

export default init;

import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setLocale } from 'yup';

import resources from './locales/index.js';
import store from '../store/index.js';
import App from './App.jsx';

const init = () => {
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

  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  return vdom;
};

export default init;

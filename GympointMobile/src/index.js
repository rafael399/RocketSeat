import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store } from './store';
import App from './App';

export default function Index() {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <App />
      </Provider>
    </>
  );
}

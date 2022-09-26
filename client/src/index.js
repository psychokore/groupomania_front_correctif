import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

import { Provider} from 'react-redux';

import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import './styles/index.scss';


createRoot( document.getElementById('root')).render (
  <Provider store={store} >
    <PersistGate loading = {null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);




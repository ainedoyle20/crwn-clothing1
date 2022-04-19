import React from 'react';
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { stripePromise } from './utils/stripe/stripe.utils';
import { Elements } from '@stripe/react-stripe-js';

import App from './App';

import { store, persistor } from './store/store';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import './index.scss';

// NOTE: react 18 changes BREAKS Stripe.js
// For this reason I returned to using react 17

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

reportWebVitals();

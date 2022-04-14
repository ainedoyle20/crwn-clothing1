import React from 'react';
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import App from './App';

import { store, persistor } from './store/store';

import './index.scss';

import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);

reportWebVitals();

// NOTE: react 18 changes BREAKS Stripe.js
// For this reason I returned to using react 17

// REACT 18
// import { createRoot } from 'react-dom/client';
//
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={<h2>Loading...</h2>} persistor={persistor}>
//         <BrowserRouter>
//           {/* <Elements stripe={stripePromise}>
//             {console.log('stripePromise: ', stripePromise)} */}
//             <App />
//           {/* </Elements> */}
//         </BrowserRouter>
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>,
// );
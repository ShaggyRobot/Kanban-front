import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './RTK';

import App from './Components/App/App';

import './utils/i18n';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>
);

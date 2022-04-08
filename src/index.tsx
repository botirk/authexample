import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Index from './routes/index'
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Index/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

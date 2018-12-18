import React from 'react';
import ReactDOM from 'react-dom';
import IRouter from './router';
import { Provider } from 'react-redux';
import configStore from './redux/store';
import * as serviceWorker from './serviceWorker';

let store = configStore();
ReactDOM.render(
  <Provider store={store}>
    <IRouter />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

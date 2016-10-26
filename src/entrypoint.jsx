import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import trumpMM from './Application/Redux/reducers';
import createActions from './Application/Redux/actions';
import Mousetrap from 'mousetrap';
import broadcastManager from './util/broadcastManager';

import App from './Application/app';

const store = createStore(trumpMM);
const THIRTY_FPS = 40;
const ONE_MINUTE = 1000 * 60;

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app-container')
);


setInterval(() => {
  store.dispatch(createActions.collectIncome());
}, THIRTY_FPS);

setInterval(() => {
  const quote = broadcastManager.getQuote();
  if (quote === '') return;

  store.dispatch(createActions.broadcastNews(quote));
}, ONE_MINUTE);

// Dev backdoor for testing
// Mousetrap.bind(['space'], (e) => { store.dispatch(createActions.deposit(500)); e.preventDefault(); });

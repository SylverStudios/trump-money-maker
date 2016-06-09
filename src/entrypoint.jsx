import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import trumpMM from './Application/Redux/reducers';
import createActions from './Application/Redux/actions';
import _ from 'underscore';
import Mousetrap from 'mousetrap';

import App from './Application/app';

const store = createStore(trumpMM);
const THIRTY_FPS = 40;
const ONE_MINUTE = 1000 * 60;

let quotes = [
  'I will build a great wall – and nobody builds walls better than me, believe me – and I’ll build them very inexpensively. I will build a great, great wall on our southern border, and I will make Mexico pay for that wall. Mark my words.',
  'If I were running ‘The View’, I’d fire Rosie O’Donnell. I mean, I’d look at her right in that fat, ugly face of hers, I’d say ‘Rosie, you’re fired.',
  'All of the women on The Apprentice flirted with me – consciously or unconsciously. That’s to be expected.',
  'The beauty of me is that I’m very rich.',
  'I’ve said if Ivanka weren’t my daughter, perhaps I’d be dating her.',
  'My fingers are long and beautiful, as, it has been well documented, are various other parts of my body.',
  'The point is, you can never be too greedy.',
  'My Twitter has become so powerful that I can actually make my enemies tell the truth',
  'I\'m gunna be Yuge!',
  'China, China, China.',
];

const getRandomQuote = () => {
  // This is rand from 0 to length, inclusive lower bound, exclusive upper
  const max = quotes.length;
  if (max === 0) return '';

  const rand = Math.floor(Math.random() * max);
  quotes = _.without(quotes, rand);
  return quotes[rand];
};

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
  const quote = getRandomQuote();
  if (quote === '') return;

  store.dispatch(createActions.broadcastNews(quote));
}, ONE_MINUTE);

Mousetrap.bind(['space'], () => { store.dispatch(createActions.deposit(500)) });

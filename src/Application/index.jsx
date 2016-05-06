import React from 'react';
import Bank from './Models/Bank/Bank';

import ClickCanvas from './Components/ClickCanvas/ClickCanvas';
import MapCanvas from './Components/MapCanvas/MapCanvas';
import NewsRoom from './Components/NewsRoom/NewsRoom';
import Store from './Components/Store/Store';

import OrderedPair from './Components/MapCanvas/OrderedPair';
import { List } from 'immutable';

/**
 * This should handle the top level components.
 * NavBar
 * ClickZone
 * MapZone
 * Store
 * Mint
 * NewsRoom
 */

const Application = React.createClass({
  // This stuff is temporary state machine logic to be replaced by redux
  bank: new Bank(),
  articles: ['hi', 'another articles is here!'],
  quotes: [
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
  ],
  pins: new List(),

  // 1000ms / 60fps = 20mspf
  FRAME_RATE: 20,

  addRandomQuote() {
    // This is rand from 0 to length, inclusive lower bound, exclusive upper
    const max = this.quotes.length;
    const rand = Math.floor(Math.random() * max);
    this.articles.push(this.quotes[rand]);

    if (this.articles.length > 10) {
      this.articles.shift();
    }
  },

  update() {
    this.bank.update();

    if (this.bank.canUpgrade) {
      this.bank.upgrade();
      this.bank.bestAsset.unlock();
      this.articles.push('Brand spankin\' new ' + this.bank.bestAsset.name + 's just came on sale!');
    }
    this.forceUpdate();
  },

  getInitialState() {
    this.bank.bestAsset.unlock();
    return {
      cash: this.bank.cash,
      income: this.bank.income,
    };
  },

  handleMoneyClick() {
    this.bank.addClickIncome();
    this.setState({
      cash: this.bank.cash,
      income: this.bank.income,
    });
  },

  createStoreClick(asset) {
    const _this = this;
    return () => {
      if (_this.bank.buy(asset)) {
        _this.articles.push('Trump bought a brand new ' + asset.name + '!');
      } else {
        _this.articles.push('Trump can\'t even afford a ' + asset.name + '!');
      }
      _this.forceUpdate();
    };
  },

  componentDidMount() {
    setInterval(this.update, this.FRAME_RATE);
  },

  render() {
    this.pins = this.pins.push(new OrderedPair(50, 50));

    return (
        <div>
          <div className="col-md-3">
            <NewsRoom articles={this.articles} />
          </div>

          <div className="col-md-6">
            <ClickCanvas
              cash={this.bank.cash}
              income={this.bank.income}
              canvasId="canvas"
              onClick={this.handleMoneyClick}
              image="penny"
            />
            <MapCanvas pins={this.pins} />
          </div>

          <div className="col-md-3">
            <Store assets={this.bank.assets} createOnClick={this.createStoreClick} />
          </div>
        </div>
    );
  },
});

export default Application;

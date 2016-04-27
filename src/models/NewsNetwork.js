import funcLog from '../util/funcLog';

class NewsNetwork {
  constructor(elementId) {
    this._newsQueue = [];
    this._quotes = [
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
    this._page = document.getElementById(elementId);
    funcLog('we have this many quotes: ', this._quotes.length);
  }

  get news() {
    return this._newsQueue;
  }

  add(string) {
    this._newsQueue.push(string);

    if (this._newsQueue.length > 10) {
      this._newsQueue.shift();
    }
  }

  addRandomQuote() {
    const min = 0;
    const max = this._quotes.length;
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    this.add(this._quotes[rand]);
    this.publish();
  }


  publish() {
    let html = '<ol>';

    for (const article of this._newsQueue) {
      html += '<li>';
      html += article;
      html += '</li>';
    }

    html += '</ol>';

    this._page.innerHTML = html;
  }
}

export default NewsNetwork;

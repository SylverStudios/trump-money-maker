import StateUtils from '../src/Application/Redux/StateUtils';
import Bank from '../src/Application/Models/Bank';

import chai from 'chai';
const assert = chai.assert;


describe('StateUtils', function () {

  describe('canBuy()', function () {

    it('should return true if you can afford to buy the asset', function () {
      const state = StateUtils.getInitialState();
      state.bank = new Bank(100, 0, 0, new Date().getTime());
      assert(StateUtils.canBuy(state, 0), 'can afford a tenement');
    });

    it('should return false if you can\'t afford to buy the asset', function () {
      const state = StateUtils.getInitialState();
      state.bank = new Bank(100, 0, 0, new Date().getTime());
      assert(!StateUtils.canBuy(state, 4), 'can\t afford something more expensive');
    });

  });

});
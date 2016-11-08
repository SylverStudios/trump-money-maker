import TellerState from '../../Models/TellerState';
import { tellerConfig } from '../../../util/constants';

function increasePrice(price) {
  return parseFloat((price * tellerConfig.priceMultiplier).toFixed(2));
}

export default function (state) {
  const { bank, teller } = state;
  const { numTellers, tellerPrice, lastCollected } = teller;
  if (bank.cash < tellerPrice) {
    return state; // not enough money
  }
  const newBank = bank.withdraw(tellerPrice);
  const newTeller = new TellerState(numTellers + 1, increasePrice(tellerPrice), lastCollected);
  return Object.assign({}, state, { bank: newBank, teller: newTeller });
}

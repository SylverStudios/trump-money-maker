import React from 'react';
import numeral from 'numeral';

const ScoreRollup = (props) => (
  <div className="score-rollup">
    Trump Real Estate LLC
    <div>
      Cash:
      <span className="cash">{numeral(props.cash).format('($ 0.00 a)')}</span>
    </div>

    <div>
      Income:
      <span className="income">{numeral(props.income).format('($ 0.00 a)')}</span>
    </div>

  </div>
);

ScoreRollup.propTypes = {
  cash: React.PropTypes.number.isRequired,
  income: React.PropTypes.number.isRequired,
};

export default ScoreRollup;

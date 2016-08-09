import { connect } from 'react-redux';
import ScoreRollup from './ScoreRollup';

const mapStateToProps = (state) => {
  return {
    cash: state.bank.cash,
    income: state.bank.income,
  };
};

const ScoreRollupContainer = connect(
  mapStateToProps
)(ScoreRollup);

export default ScoreRollupContainer;

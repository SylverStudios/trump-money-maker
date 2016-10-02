import { connect } from 'react-redux';
import Modal from './Modal';
import createAction from '../../Redux/actions';

const mapStateToProps = (state) => {
  const { title, body } = state.modal;
  return {
    show: !!title,
    title: title,
    body: body,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch(createAction.startGame());
    },
  };
};

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

export default ModalContainer;

import { connect } from 'react-redux';
import Modal from './Modal';
import createAction from '../../Redux/actions';

const mapStateToProps = (state) => {
  const { modalType } = state.modal;
  return {
    show: !!modalType,
    modalType: modalType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch(createAction.startGame());
    },

    next: (modalType) => {
      dispatch(createAction.showModal(modalType));
    },
  };
};

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

export default ModalContainer;

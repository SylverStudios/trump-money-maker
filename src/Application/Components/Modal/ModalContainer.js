import { connect } from 'react-redux';
import Modal from './Modal';
import createAction from '../../Redux/actions';

const mapStateToProps = (state) => {
  const { show, title, body } = state.modal;
  return {
    show: show,
    title: title,
    body: body,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch(createAction.hideModal());
    },
  };
};

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

export default ModalContainer;

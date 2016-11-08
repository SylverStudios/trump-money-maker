import React from 'react';
import { modals } from '../../../util/constants';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, modalType, next, onClose } = this.props;

    if (!show) {
      return null;
    }

    const modalStyle = modalType.style + ' panel panel-primary';

    const onClickFxn = modalType.next ? () => next(modals[modalType.next]) : onClose;
    const buttonText = modalType.next ? 'Next' : 'Start Game';

    return (
      <div className="backdrop">
        <div className={modalStyle}>

          <div className="panel-heading">
            <h3 className="panel-title news-title text-center">{modalType.title}</h3>
          </div>

          <div className="panel-body">
            {modalType.body}
          </div>

          <div className="panel-footer">
            <button className="btn btn-default center-block" onClick={onClickFxn}>{buttonText}</button>
          </div>

        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modalType: React.PropTypes.object,
  next: React.PropTypes.func,
  onClose: React.PropTypes.func,
  show: React.PropTypes.bool.isRequired,
};

export default Modal;

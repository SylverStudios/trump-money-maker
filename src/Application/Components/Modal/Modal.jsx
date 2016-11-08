import React from 'react';
import { modals } from '../../../util/constants';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.createFooter = this.createFooter.bind(this);
  }

  createFooter(modalType, nextPartial, onCloseFxn) {
    if (modalType.next) {
      const nextFxn = () => nextPartial(modals[modalType.next]);
      return (
        <div className="panel-footer">
          <button className="btn btn-default left-side" onClick={onCloseFxn}>Skip Tutorial</button>
          <button className="btn btn-default right-side" onClick={nextFxn}>Next</button>
        </div>
      );
    }

    return (
      <div className="panel-footer">
        <button className="btn btn-default center-block" onClick={onCloseFxn}>Start Game</button>
      </div>
    );
  }

  render() {
    const { show, modalType, next, onClose } = this.props;

    if (!show) {
      return null;
    }
    const modalStyle = modalType.style + ' panel panel-primary';

    return (
      <div className="backdrop">
        <div className={modalStyle}>

          <div className="panel-heading">
            <h3 className="panel-title news-title text-center">{modalType.title}</h3>
          </div>

          <div className="panel-body">
            {modalType.body}
          </div>

          {this.createFooter(modalType, next, onClose)}
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

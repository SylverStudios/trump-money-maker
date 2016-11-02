import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, title, body, onClose } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="simple-modal panel panel-primary">

          <div className="panel-heading">
            <h3 className="panel-title news-title text-center">{title}</h3>
          </div>

          <div className="panel-body">
            {body}
          </div>

          <div className="panel-footer">
            <button className="btn btn-default center-block" onClick={onClose}>Start</button>
          </div>

        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  body: React.PropTypes.object,
  onClose: React.PropTypes.func,
  show: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string,
};

export default Modal;

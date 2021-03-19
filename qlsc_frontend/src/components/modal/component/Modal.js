import React from 'react';
import { connect } from 'react-redux';

function Modal(props){
    const {
      title, children, id, className,
    } = props;
    const type = props.type || '';
    return (
      <div ref={(n) => {
        modal = n;
      }} className={`modal fade ${className}`} id={id} role="dialog"
      >
        <div className={`modal-dialog ${type}`} ref={(n) => {
          dialog = n;
        }}
        >
          <div className="modal-content">
            {title ? (
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">{title}</h4>
              </div>
            ) : null}
            {children}
          </div>
        </div>
      </div>
    );
  }

export default connect(
  null,
  null
)(Modal);

export const ModalHeader = ({ children }) => (
  <div className="modal-header">
    {children}
  </div>
);

export const ModalBody = ({ children, className, flex = true }) => (
  <div className={`modal-body ${flex ? 'd-flex' : ''} ${className}`}>
    {children}
  </div>
);

export const ModalFooter = ({ children }) => (
  <div className="modal-footer">
    {children}
  </div>
);

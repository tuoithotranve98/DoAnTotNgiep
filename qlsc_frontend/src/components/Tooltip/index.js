/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ReactTooltip from 'react-tooltip';

class Tooltip extends React.Component {
  render() {
    const {
      id,
      text,
      place = 'top',
      className,
      tooltipClassName,
      onClick,
      comp,
    } = this.props;
    return (
      <React.Fragment>
        <span
          data-tip
          data-for={id}
          className={className ? `d-flex align-items-center ${className}` : 'd-flex align-items-center'}
          onClick={onClick}
        >
          {comp || text}
        </span>
        <ReactTooltip
          id={id}
          place={place}
          type="dark"
          effect="solid"
          className={tooltipClassName}
        >
          {text}
        </ReactTooltip>
      </React.Fragment>
    );
  }
}

export default Tooltip;

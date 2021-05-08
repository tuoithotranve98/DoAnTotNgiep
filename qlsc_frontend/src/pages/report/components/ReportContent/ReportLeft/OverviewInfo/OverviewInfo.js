import React, { useState } from 'react';
import * as Icons from 'pages/report/commons/Icons';
import './styles.scss';
import Tooltip from '../../../../../../components/Tooltip';

const nf = new Intl.NumberFormat('en');


function OverviewInfo(props) {
  const {
    title,
    value,
    changeValue,
    handleClick,
    color,
    isSelected,
    currentTime,
    lastPeriodTime,
    lastValue,
    dayCount,
    unit,
    suffix,
    rounded,
    place,
    tooltipId,
    tooltipText
  } = props;
  const [show, setShow] = useState(false);
  const nf = new Intl.NumberFormat('en');

  return (
    <div
      className={isSelected ? "d-flex position-relative overview-info overview-info-active" : "d-flex position-relative overview-info"}
      onClick={handleClick}
      role="presentation"
    >
      <div
        className="d-flex align-items-center justify-content-between overview-info-content"
      >
        {
          isSelected ? (
            <div
              className="overview-selected"
              style={{ backgroundColor: color }}
            />
          ) : null
        }
        <div className="overview-info-left">
          <div className="d-flex align-items-center overview-info-header">
            {title}&nbsp;
            {
              tooltipText ? (
                <Tooltip
                  comp={<Icons.inforIcon medium id={tooltipId} />}
                  text={tooltipText}
                  tooltipClassName="report-tooltip"
                  id={tooltipId}
                  className="d-flex align-items-center"
                  place="top"
                />
              ) : null
            }
          </div>
          <div className="overview-info-value">
            {rounded ? (nf.format(value ? value.toFixed() : 0)) : nf.format(value || 0)}
            {unit}
          </div>
        </div>
      </div>
    </div>
  )
}

OverviewInfo.defaultProps = {
  changeValue: 0,
  rounded: true,
  place: 'right',
};

export default OverviewInfo;

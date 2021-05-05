/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import '../../styles/item.scss';
import ReactTooltip from 'react-tooltip';
import { moneyFormat } from 'utils/moneyFormat';
import * as Icons from 'pages/maintenancecard/commons/Icons';


function Item(props) {
  const { checked } = props;
  const onCheck = (e) => {
    e.stopPropagation();
    const { onCheckBoxClick } = props;
    onCheckBoxClick(id);
  };


  return (
    <div className="delivery-collations-item-wrapper">
      <div
        className="d-flex delivery-collations-listing-item"
      >
        <div role="presentation" className="checkbox header-checkbox" onClick={(e) => onCheck(e)}>
          <input
            type="checkbox"
            name="check"
            checked={checked}
            readOnly
          />
          <label />
        </div>
        <div className="">
          &nbsp;&nbsp;
        </div>
        <div className="margin-right20 item-list text-ellipsis">
          <span className="item-name">
            <a
              data-tip
              data-for={`order_collation_number_id_${1}`}
            //   href={calcHref(connection.channel_type)}
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              KH001
              <ReactTooltip
                place="top"
                type="dark"
                effect="solid"
                isMultiline
                id={`order_collation_number_id_${1}`}
              >
                KH001
              </ReactTooltip>

            </a>
          </span>
        </div>
        <div className="margin-right20 item-list text-ellipsis">
           Nguyễn Xuân Thọ
        </div>
        <div className="margin-right20 delivery-collation-location"
          data-tip
          data-for={`delivery-collation-location_${1}`}
        >
            0357004230
        </div>
        <div className="margin-right20 item-list" style={{ color: status.color }}>
          nxtho0109@gmail.com
        </div>
      </div>
    </div>
  );
}

Item.defaultProps = {
  item: {},
};

export default connect(null, null)(Item);

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import '../../styles/item.scss';
import ReactTooltip from 'react-tooltip';
import { staff_role } from "../../../../../../commons/staffConstants";
import pushstate from "utils/pushstate";

function Item(props) {
  const { checked, staff } = props;
  const onCheck = (e) => {
    e.stopPropagation();
    const { onCheckBoxClick } = props;
    onCheckBoxClick(staff.id);
  };

  const handleTextRole = () => {
    if (staff && staff.role) {
      const role = staff_role.find((role) => role.id === staff.role);
      if (role) return role.name;
    }
    return 'Chủ cửa hàng';
  }

  const onRedirectDetail = () => {
    // pushstate(props.history, `/staff/detail/${staff.id}`);
    pushstate(props.history, `/staff/update/${staff.id}`);
  }

  return (
    <div className="staff-item-wrapper">
      <div
        className="d-flex staff-listing-item"
        onClick={() => onRedirectDetail()}
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
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              {(staff && staff.code) || ''}
              <ReactTooltip
                place="top"
                type="dark"
                effect="solid"
                isMultiline
                id={`order_collation_number_id_${1}`}
              >
                {(staff && staff.code) || ''}
              </ReactTooltip>

            </a>
          </span>
        </div>
        <div className="margin-right20 item-list text-ellipsis">
        {(staff && staff.name) || ''}
        </div>
        <div className="margin-right20 delivery-collation-location"
          data-tip
          data-for={`delivery-collation-location_${1}`}
        >
            {(staff && staff.email) || ''}
        </div>
        <div className="margin-right20 item-list" style={{ color: status.color }}>
        {(staff && staff.phone) || ''}
        </div>
        <div className="margin-right20 item-list delivery-collation-code">
        {handleTextRole()}
        </div>
        <div className="margin-right20 item-list order-collations-total-amount">
        {(staff && staff.totalMaintenanceCard) || 0}
        </div>
      </div>
    </div>
  );
}

Item.defaultProps = {
  item: {},
};

export default withRouter(connect(null, null)(Item));

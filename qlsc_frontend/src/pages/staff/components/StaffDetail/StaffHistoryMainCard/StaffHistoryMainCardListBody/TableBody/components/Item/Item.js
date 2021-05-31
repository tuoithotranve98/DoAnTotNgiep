import React from "react";
import { connect } from "react-redux";
import { useHistory } from 'react-router';
import { withRouter } from "react-router-dom";
import "../../styles/item.scss";
import ReactTooltip from "react-tooltip";
import pushstate from "utils/pushstate";
const listStatus = [
  {
    status: 0,
    name: "Đang chờ",
  },
  {
    status: 1,
    name: "Đang sửa",
    color: '#F19403',
  },
  {
    status: 2,
    name: "Hoàn thành",
    color: '#20A917',
  },
];
const listPayment = [
  {
    status: 0,
    name: "Chưa thanh toán",
    color: "red",
  },
  {
    status: 1,
    name: "Đã thanh toán",
    color: '#20A917',
  },
];
function Item(props) {
  const { checked, staffHistoryMainCard } = props;
  const history = useHistory();
  const onCheck = (e) => {
    e.stopPropagation();
    const { onCheckBoxClick } = props;
    onCheckBoxClick(staffHistoryMainCard.id);
  };

  const onRedirectDetail = (e) => {
    e.stopPropagation();
    pushstate(history, `/staffHistoryMainCard/detail/${staffHistoryMainCard.id}`);
  }

  return (
    <div className="delivery-collations-item-wrapper">
      <div className="d-flex delivery-collations-listing-item"
      onClick={(e) => onRedirectDetail(e)}>
        <div
          role="presentation"
          className="checkbox header-checkbox"
          onClick={(e) => onCheck(e)}
        >
          <input type="checkbox" name="check" checked={checked} readOnly />
          <label />
        </div>
        <div className="">&nbsp;&nbsp;</div>
        <div className="margin-right20 item-list text-ellipsis">
          <span className="item-name">
            <a
              data-tip
              data-for={`order_collation_number_id_${1}`}
              target="_blank"
              style={{ textDecoration: "none", color: '#007bff' }}
            >
              {(staffHistoryMainCard && staffHistoryMainCard.code.toUpperCase()) || '---'}
              <ReactTooltip
                place="top"
                type="dark"
                effect="solid"
                isMultiline
                id={`order_collation_number_id_${1}`}
              >
                {(staffHistoryMainCard && staffHistoryMainCard.code.toUpperCase()) || '---'}
              </ReactTooltip>
            </a>
          </span>
        </div>
        <div className="margin-right20 item-list text-ellipsis">
        {(staffHistoryMainCard && staffHistoryMainCard.customer && staffHistoryMainCard.customer.name) || '---'}
        </div>
        <div
          className="margin-right20 delivery-collation-location"
          data-tip
          data-for={`delivery-collation-location_${1}`}
        >
         {(staffHistoryMainCard && staffHistoryMainCard.platesNumber) || '---'}
        </div>
        <div
          className="margin-right20 item-list"
        >
          {(staffHistoryMainCard && staffHistoryMainCard.price) || '---'}
        </div>
        <div
          className="margin-right20 item-list"
        >
          {(staffHistoryMainCard && staffHistoryMainCard.coordinator && staffHistoryMainCard.coordinator.name) || '---'}
        </div>
        <div className="margin-right20 item-list text-ellipsis">
        {staffHistoryMainCard && staffHistoryMainCard.payStatus && listPayment.map((item) => {
            if (item.status === staffHistoryMainCard.payStatus) {
              return (
                <div
                  className="text"
                  style={{
                    color: `${item.color}`,
                  }}
                >
                  {item.name}
                </div>
              );
            } else {
              return ''
            }
          }) || '---'}
        </div>
        <div className="margin-right20 item-list text-ellipsis">
        {staffHistoryMainCard && staffHistoryMainCard.workStatus && listStatus.map((item) => {
            if (item.status === staffHistoryMainCard.workStatus) {
              return (
                <div
                  className="text"
                  style={{
                    color: `${item.color}`,
                  }}
                >
                  {item.name}
                </div>
              );
            } else {
              return ''
            }
          }) || '---'}
        </div>

      </div>
    </div>
  );
}

Item.defaultProps = {
  item: {},
};

export default withRouter(connect(null, null)(Item));

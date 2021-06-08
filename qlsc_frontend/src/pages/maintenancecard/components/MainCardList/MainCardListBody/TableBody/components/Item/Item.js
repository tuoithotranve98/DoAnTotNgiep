import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
import "../../styles/item.scss";
import ReactTooltip from "react-tooltip";
import pushstate from "utils/pushstate";
import { moneyFormat, formatDate } from "../../../../../../../../utils/moneyFormat";
import { convertSecondToDateV1 } from "../../../../../../../../utils/datetimeUtil";
const listStatus = [
  {
    status: 0,
    name: "Đang chờ",
  },
  {
    status: 1,
    name: "Đang sửa",
    color: "#F19403",
  },
  {
    status: 2,
    name: "Hoàn thành",
    color: "#20A917",
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
    color: "#20A917",
  },
];
function Item(props) {
  const { checked, mainCard } = props;
  const history = useHistory();
  const onCheck = (e) => {
    e.stopPropagation();
    const { onCheckBoxClick } = props;
    onCheckBoxClick(mainCard.id);
  };

  const onRedirectDetail = (e) => {
    e.stopPropagation();
    pushstate(history, `/maintenance-card/detail/${mainCard.id}`);
  };

  return (
    <div className="main-card-item-wrapper">
      <div className="d-flex main-card-listing-item">
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
              data-for={`order_collation_number_id_${mainCard.code}`}
              target="_blank"
              onClick={(e) => onRedirectDetail(e)}
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              {(mainCard && mainCard.code.toUpperCase()) || "---"}
              <ReactTooltip
                place="top"
                type="dark"
                effect="solid"
                isMultiline
                id={`order_collation_number_id_${mainCard.code}`}
              >
                {(mainCard && mainCard.code.toUpperCase()) || "---"}
              </ReactTooltip>
            </a>
          </span>
        </div>
        <div
          className="margin-right20 item-list text-ellipsis"
          data-tip
          data-for={`order_collation_number_id_${
            mainCard.customer_name || "name"
          }`}
        >
          {(mainCard && mainCard.customer_name) || ""}
          <ReactTooltip
            place="top"
            type="dark"
            effect="solid"
            isMultiline
            id={`order_collation_number_id_${mainCard.customer_name || "name"}`}
          >
            {(mainCard && mainCard.customer_name) || ""}
          </ReactTooltip>
        </div>
        <div
          className="margin-right20 delivery-collation-location"
          data-tip
          data-for={`delivery-collation-location_${1}`}
        >
          {(mainCard && mainCard.plates_number) || "---"}
        </div>
        <div
          className="margin-right20 item-list"
          style={{ color: status.color }}
        >
          {(mainCard && mainCard.coordinator_name) || ""}
        </div>
        <div className="margin-right20 item-list">
          {(mainCard && mainCard.repairman_name) || ""}
        </div>
        <div className="margin-right20 item-list">
          {listPayment.map((item) => {
            if (item.status === mainCard.pay_status) {
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
              return "";
            }
          })}
        </div>
        <div className="margin-right20 item-list">
          {listStatus.map((item) => {
            if (item.status === mainCard.work_status) {
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
              return <div></div>;
            }
          })}
        </div>
        <div className="margin-right20 item-list">
          {mainCard.return_date ? convertSecondToDateV1(mainCard.return_date) : '---'}
        </div>
        <div className="margin-right20 item-list">
          {moneyFormat(mainCard && mainCard.price) || 0} đ
        </div>
      </div>
    </div>
  );
}

Item.defaultProps = {
  item: {},
};

export default withRouter(connect(null, null)(Item));

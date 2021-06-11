import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
import "../../styles/item.scss";
import ReactTooltip from "react-tooltip";
import pushstate from "utils/pushstate";
import { convertSecondToDateV1 } from "../../../../../../../../../utils/datetimeUtil";
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
  const { checked, historyMainCard } = props;
  const history = useHistory();
  const onCheck = (e) => {
    e.stopPropagation();
    const { onCheckBoxClick } = props;
    onCheckBoxClick(historyMainCard.id);
  };

  const onRedirectDetail = (e) => {
    e.stopPropagation();
    pushstate(history, `/maintenance-card/detail/${historyMainCard.id}`);
  };

  return (
    <div className="delivery-collations-item-wrapper">
      <div
        className="d-flex delivery-collations-listing-item"
        onClick={(e) => onRedirectDetail(e)}
      >
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
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              {(historyMainCard && historyMainCard.code.toUpperCase()) || "---"}
              <ReactTooltip
                place="top"
                type="dark"
                effect="solid"
                isMultiline
                id={`order_collation_number_id_${1}`}
              >
                {(historyMainCard && historyMainCard.code.toUpperCase()) ||
                  "---"}
              </ReactTooltip>
            </a>
          </span>
        </div>
        <div className="margin-right20 item-list text-ellipsis">
          {(historyMainCard && historyMainCard.platesNumber) || "---"}
        </div>
        <div
          className="margin-right20 delivery-collation-location"
          data-tip
          data-for={`delivery-collation-location_${1}`}
        >
          {(historyMainCard &&
            historyMainCard.coordinator &&
            historyMainCard.coordinator.name) ||
            "---"}
        </div>
        <div
          className="margin-right20 delivery-collation-location"
          data-tip
          data-for={`delivery-collation-location_${1}`}
        >
          {(historyMainCard &&
            historyMainCard.repairman &&
            historyMainCard.repairman.name) ||
            "---"}
        </div>
        <div className="margin-right20 item-list text-ellipsis">
          {historyMainCard &&
            listPayment.map((item) => {
              if (item.status === historyMainCard.payStatus) {
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
              }
              return null;
            })}
        </div>
        <div className="margin-right20 item-list text-ellipsis">
          {historyMainCard &&
            listStatus.map((item) => {
              if (item.status === historyMainCard.workStatus) {
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
              }
              return null;
            })}
        </div>
        <div className="margin-right20 item-list text-ellipsis">
          {(historyMainCard &&
            historyMainCard.returnDate &&
            convertSecondToDateV1(historyMainCard.returnDate)) ||
            "---"}
        </div>
      </div>
    </div>
  );
}

Item.defaultProps = {
  item: {},
};

export default withRouter(connect(null, null)(Item));

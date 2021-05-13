import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
import "../../styles/item.scss";
import ReactTooltip from "react-tooltip";
import pushstate from "utils/pushstate";
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
    pushstate(history, `/mainCard/detail/${mainCard.id}`);
  };

  return (
    <div className="main-card-item-wrapper">
      <div
        className="d-flex main-card-listing-item"
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
              {(mainCard && mainCard.code) || "---"}
              <ReactTooltip
                place="top"
                type="dark"
                effect="solid"
                isMultiline
                id={`order_collation_number_id_${1}`}
              >
                {(mainCard && mainCard.code) || "---"}
              </ReactTooltip>
            </a>
          </span>
        </div>
        <div className="margin-right20 item-list text-ellipsis">
          {(mainCard && mainCard.customer_name) || ""}
        </div>
        <div
          className="margin-right20 delivery-collation-location"
          data-tip
          data-for={`delivery-collation-location_${1}`}
        >
          {(mainCard && mainCard.customer_name) || "---"}
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
          {(mainCard && mainCard.pay_status) || ""}
        </div>
        <div className="margin-right20 item-list">
          {(mainCard && mainCard.work_status) || ""}
        </div>
        <div className="margin-right20 item-list">
          {(mainCard && mainCard.return_date) || ""}
        </div>
        <div className="margin-right20 item-list">
          {(mainCard && mainCard.price  ) || ""}
        </div>
      </div>
    </div>
  );
}

Item.defaultProps = {
  item: {},
};

export default withRouter(connect(null, null)(Item));

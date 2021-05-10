import React from "react";
import { connect } from "react-redux";
import { useHistory } from 'react-router';
import { withRouter } from "react-router-dom";
import "../../styles/item.scss";
import ReactTooltip from "react-tooltip";
import pushstate from "utils/pushstate";
function Item(props) {
  const { checked, historyMainCard } = props;
  const history = useHistory();
  console.log("historyMainCard", historyMainCard);
  const onCheck = (e) => {
    e.stopPropagation();
    const { onCheckBoxClick } = props;
    onCheckBoxClick(historyMainCard.id);
  };

  const onRedirectDetail = (e) => {
    e.stopPropagation();
    pushstate(history, `/historyMainCard/detail/${historyMainCard.id}`);
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
              {(historyMainCard && historyMainCard.code) || ''}
              <ReactTooltip
                place="top"
                type="dark"
                effect="solid"
                isMultiline
                id={`order_collation_number_id_${1}`}
              >
                {(historyMainCard && historyMainCard.code) || ''}
              </ReactTooltip>
            </a>
          </span>
        </div>
        <div className="margin-right20 item-list text-ellipsis">
        {(historyMainCard && historyMainCard.name) || ''}
        </div>
        <div
          className="margin-right20 delivery-collation-location"
          data-tip
          data-for={`delivery-collation-location_${1}`}
        >
         {(historyMainCard && historyMainCard.phone) || ''}
        </div>
        <div
          className="margin-right20 item-list"
          style={{ color: status.color }}
        >
          {(historyMainCard && historyMainCard.email) || ''}
        </div>
      </div>
    </div>
  );
}

Item.defaultProps = {
  item: {},
};

export default withRouter(connect(null, null)(Item));

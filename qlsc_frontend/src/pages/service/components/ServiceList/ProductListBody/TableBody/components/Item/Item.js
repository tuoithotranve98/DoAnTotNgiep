import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "../../styles/item.scss";
import ReactTooltip from "react-tooltip";
import pushstate from "utils/pushstate";
import { moneyFormat } from "../../../../../../../../utils/moneyFormat";

function Item(props) {
  const { checked, productService } = props;
  const onCheck = (e) => {
    e.stopPropagation();
    const { onCheckBoxClick } = props;
    onCheckBoxClick(productService.id);
  };

  const onRedirectDetail = (e) => {
    e.stopPropagation();
    pushstate(props.history, `/service/update/${productService.id}`);
  };

  return (
    <div className="service-item-wrapper">
      <div className="d-flex product-listing-item" onClick={(e) => onRedirectDetail(e)}>
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
              data-for={`order_collation_number_id_${productService.id}`}
              target="_blank"
              style={{ textDecoration: "none", color: '#007bff' }}
            >
              {productService.code.toUpperCase()}
              <ReactTooltip
                place="top"
                type="dark"
                effect="solid"
                isMultiline
                id={`order_collation_number_id_${productService.id}`}
              >
                {productService.code.toUpperCase()}
              </ReactTooltip>
            </a>
          </span>
        </div>
        <div className="margin-right20 item-list text-ellipsis">
          {productService.name}
        </div>

        <div className="margin-right20 item-list order-collations-total-amount">
        {moneyFormat(productService.pricePerUnit)} đ
        </div>
      </div>
    </div>
  );
}

Item.defaultProps = {
  item: {},
};

export default withRouter(connect(null, null)(Item));

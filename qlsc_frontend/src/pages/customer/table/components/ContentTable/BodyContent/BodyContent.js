import React from "react";
import { withRouter } from 'react-router-dom';
import { getFormattedDate } from "utils/datetimeUtil";
import pushstate from "utils/pushstate";
import Checkbox from "components/buttons/Checkbox";
import "./bodyContent.scss";

function BodyContent(props) {
  const { customers } = props;

  const onRedirectCustomerInfo = (id) => {
    pushstate(props.history, `/customer/${id}/info`);
  };

  return (
    <div className="customer-list-container">
      {customers &&
        customers.map((item) => {
          return (
            <div
              className="d-flex customer-item"
              key={item.id}
              onClick={() => onRedirectCustomerInfo(item.id)}
            >
              <Checkbox checked onCheck />
              <div className="margin-right20 item-list item-id">
                {item.code}
              </div>
              <div className="margin-right20 item-list item-name">
                {item.name}
              </div>
              <div className="margin-right20 item-list item-date">
                {getFormattedDate(item.createdDate)}
              </div>
              <div className="margin-right20 item-list item-phone">
                {item.phone}
              </div>
              <div className="margin-right20 item-list item-address">
                {item.address}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default withRouter(BodyContent);

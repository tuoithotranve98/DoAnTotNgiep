import React, { useState } from "react";
import * as Icons from "pages/maintenancecard/commons/Icons";
import CustomerModal from "../Modal/CustomerModal/CustomerModal";
import SearchCustomer from "./SearchCustomer/SearchCustomer";

import "./styles.scss";

function InfoCustomer(props) {
  const { setCustomer, customer } = props;
  const [showFilterCustomer, setShowFilterCustomer] = useState(false);
  console.log("showFilterCustomer", showFilterCustomer);
  console.log("customer", customer);
  return (
    <div className="info-customer-warpper">
      <div className="title">Thông tin khách hàng</div>
      {showFilterCustomer ? (
        <div className="d-flex">
          <div>
            <Icons.IconCustomer />
          </div>
          <div>
            <div>{customer.name}</div>
            <div>{customer.phone}</div>
          </div>
        </div>
      ) : (
        <SearchCustomer
          setCustomer={(a) => setCustomer(a)}
          setShowFilterCustomer={(a) => setShowFilterCustomer(a)}
        />
      )}
    </div>
  );
}

export default InfoCustomer;

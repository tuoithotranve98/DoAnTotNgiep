import React, { useEffect, useState } from "react";
import "./contentTable.scss";
import * as Icons from "../../Icons/Icons";
import Header from "./Header/Header";
import BodyContent from "./BodyContent/BodyContent";

function ContentTable(props) {
  const [customers, setCustomers] = useState([]);
  const renderNoContent = () => {
    return (
      <div id="wrapper-content-table">
        <div className="dashboard-body-content">
          <div className="content-container">
            <div className="customer-list-wrapper">
              <div className="filter-null">
                <div className="row filter-null-icon">
                  <Icons.messagesBigIcon />
                </div>
                <div className="row filter-null-text-three">
                  Chưa có khách hàng nào được tạo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (props.customer && props.customer.customers) {
      setCustomers(props.customer.customers);
    }
  }, [props.customer])

  if (customers && !customers.length) {
    return renderNoContent();
  }
  return (
    <div id="wrapper-content-table">
      <div className="dashboard-body-content">
        <div className="content-container">
          <div className="customer-list-wrapper">
            <Header />
            <BodyContent customers={customers} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentTable;

import React from "react";
import { connect } from "react-redux";
import "../styles/filterCustomer.scss";
import * as Icons from "pages/maintenancecard/commons/Icons";
function FilterCustomer(props) {
  const { handleInputOnchange, search } = props;
  return (
    <div id="filter-customer-wrapper">
      <div id="filter-customer-by-tab-wrapper">
        <ul id="filter-customer-by-tab">
          <li className="filter-customer-tab active">Tất cả phiếu sửa chữa</li>
        </ul>
      </div>
      <div id="filter-customer-option-wrapper">
        <div id="filter-customer-search">
          <div id="filter-customer-search-icon">
            <Icons.Search />
          </div>
          <input
            id="filter-customer-search-input"
            placeholder="Tìm kiếm phiếu sữa chữa theo mã phiếu hoặc số điện thoại"
            value={search}
            onChange={(e) => handleInputOnchange(e)}
          />
        </div>
      </div>
    </div>
  );
}

FilterCustomer.defaultProps = {};

export default connect(null, null)(FilterCustomer);

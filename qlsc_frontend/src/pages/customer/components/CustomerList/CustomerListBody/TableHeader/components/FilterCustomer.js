import React from 'react';
import { connect } from 'react-redux';
import '../styles/filterCustomer.scss';
import * as Icons from 'pages/maintenancecard/commons/Icons';
function FilterCustomer(props) {
  const { handleInputOnchange, search } = props;
  return (
    <div id="filter-customer-wrapper">
      <div id="filter-customer-by-tab-wrapper">
        <ul id="filter-customer-by-tab">
          <li
            className="filter-customer-tab active"
          >
              Tất cả khách hàng
          </li>
        </ul>
      </div>
      <div id="filter-customer-option-wrapper">
        <div id="filter-customer-search">
          <div id="filter-customer-search-icon">
            <Icons.Search />
          </div>
          <input
            id="filter-customer-search-input"
            placeholder="Tìm kiếm khách hàng theo tên khách hàng hoặc số điện thoại"
            value={search}
            onChange={(e) => handleInputOnchange(e)}
          />
        </div>
      </div>
    </div>
  );
}

FilterCustomer.defaultProps = {
};
const mapStateToProps = state => {
  //
};

const mapDispatchToProps = (dispatch) => ({
  //
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterCustomer);

/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import debounce from 'utils/debounce';
import '../styles/filterCustomer.scss';
import * as Icons from 'pages/maintenancecard/commons/Icons';

function FilterMainCard(props) {
  const { showFilter } = props;
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const { filterInfo, fetching } = props;
    if (filterText !== filterInfo.filterText && !fetching) {
      setFilterText(filterText);
    }
  }, [filterText]);

  const searchChange = debounce((e) => search(e), 400);

  const onChangeText = (e) => {
    e.persist();
    setFilterText(e.target.value);
    searchChange(e.target.value);
  };

  const search = (e) => {
    const { filterInfo } = props;
    filterInfo.filterText = e;
    // props.fetchOrderCollation(filterInfo);
  };
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
            value={filterText}
            onChange={(e) => onChangeText(e)}
          />
        </div>
      </div>
    </div>
  );
}

FilterMainCard.defaultProps = {
};
const mapStateToProps = state => {
  const { products: { filterInfo, ui: { fetching } } } = state;
  return {
    filterInfo,
    fetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  showFilter: (show) => dispatch(showFilter(show)),
  fetchOrderCollation: (filter, page) => dispatch(fetchOrderCollation(filter, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterMainCard);

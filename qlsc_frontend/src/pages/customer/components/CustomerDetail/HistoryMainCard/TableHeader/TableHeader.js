import React from 'react';
import { connect } from 'react-redux';

import FilterCustomer from './components/FilterCustomer';

function TableHeader(props) {
  const { showFilter } = props;
  return (
    <div id="delivery-collations-table-header" style={{ position: 'relative' }}>
      <FilterCustomer />
    </div>
  );
}

const mapStateToProps = state => {
  const { staffs: { filterInfo } } = state;
  const showFilter = filterInfo && filterInfo.showFilter;
  return {
    showFilter,
  };
};

export default connect(null, null)(TableHeader);

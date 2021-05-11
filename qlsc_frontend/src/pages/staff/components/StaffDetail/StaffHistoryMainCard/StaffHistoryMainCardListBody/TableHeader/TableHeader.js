import React from "react";
import { connect } from "react-redux";

import FilterCustomer from "./components/FilterCustomer";

function TableHeader(props) {
  const { search, handleInputOnchange } = props;
  return (
    <div id="delivery-collations-table-header" style={{ position: "relative" }}>
      <FilterCustomer
        search={search}
        handleInputOnchange={handleInputOnchange}
      />
    </div>
  );
}



export default connect(null, null)(TableHeader);

import React from "react";
import { connect } from "react-redux";

import FilterProduct from "./components/FilterProduct";
import FilterProductModal from "./components/FilterProductModal";

function TableHeader(props) {
  const { search, handleInputOnchange } = props;
  return (
    <div id="delivery-collations-table-header" style={{ position: "relative" }}>
      <FilterProduct
        search={search}
        handleInputOnchange={handleInputOnchange}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  //
};

export default connect(mapStateToProps, null)(TableHeader);

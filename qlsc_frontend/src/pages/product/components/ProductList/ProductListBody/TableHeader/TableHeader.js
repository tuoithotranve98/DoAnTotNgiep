import React from "react";
import { connect } from "react-redux";

import FilterProduct from "./components/FilterProduct";
import FilterProductModal from "./components/FilterProductModal";

function TableHeader(props) {
  const { showFilter } = props;
  return (
    <div id="delivery-collations-table-header" style={{ position: "relative" }}>
      <FilterProduct />
      {showFilter ? <FilterProductModal /> : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  //
};

export default connect(mapStateToProps, null)(TableHeader);

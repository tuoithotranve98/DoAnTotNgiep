import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../styles/filterProduct.scss";
import * as Icons from "pages/maintenancecard/commons/Icons";
function FilterProduct(props) {
  const {} = props;
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    setFilterText(filterText);
  }, [filterText]);

  return (
    <div id="filter-product-wrapper">
      <div id="filter-product-by-tab-wrapper">
        <ul id="filter-product-by-tab">
          <li className="filter-product-tab active">Tất cả sản phẩm</li>
        </ul>
      </div>
      <div id="filter-product-option-wrapper">
        <button type="button" id="filter-product-button">
          Lọc phiếu sửa chữa
          <Icons.ArrowDown />
        </button>
        <div id="filter-product-search">
          <div id="filter-product-search-icon">
            <Icons.Search />
          </div>
          <input
            id="filter-product-search-input"
            placeholder="Tìm kiếm phiếu sữa chữa theo mã phiếu sữa chữa"
            value={filterText}
            onChange={(e) => onChangeText(e)}
          />
        </div>
      </div>
    </div>
  );
}

FilterProduct.defaultProps = {};
const mapStateToProps = (state) => {
  //
};

const mapDispatchToProps = (dispatch) => ({
  //
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterProduct);

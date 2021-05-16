import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import debounce from "utils/debounce";
import { getProductService } from "../../actions/ProductAction";
import ProductListBody from "./ProductListBody/ProductListBody";
import ProductListHeader from "./ProductHeader/ProductListHeader";
import "./styles.scss";

const initialState = {
  page: 1,
  size: 10,
  nameField: "",
  order: "",
  type: [1, 2],
};

function ProductList(props) {
  const { onGetProductService } = props;
  const [filter, setFilter] = useState(initialState);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onGetProductService(search, filter);
  }, []);

  useEffect(() => {
    onGetProductService(search, filter);
  }, [filter]);

  const handleInputOnchange = (e) => {
    e.persist();
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  const onChangeFilter = (type, value) => {
    setFilter({
      ...filter,
      [type]: value,
    });
  };

  const debounceSearch = useCallback(
    debounce((nextValue) => onGetProductService(nextValue, filter), 200),
    []
  );
  return (
    <div className="product-screen-wrapper">
      <ProductListHeader />
      <ProductListBody
        filter={filter}
        search={search}
        handleInputOnchange={handleInputOnchange}
        onChangeFilter={onChangeFilter}
      />
    </div>
  );
}
ProductList.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  onGetProductService: (search, option) =>
    dispatch(getProductService(search, option)),
});

export default React.memo(connect(null, mapDispatchToProps)(ProductList));

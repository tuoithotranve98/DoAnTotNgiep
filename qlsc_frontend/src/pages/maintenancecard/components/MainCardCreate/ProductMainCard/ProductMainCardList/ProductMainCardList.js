import React from "react";
import Header from "./Header/Header";
import List from "./List/List";
import Total from "./Total/Total";
import "./styles.scss";
import Search from "./Search/Search";
import * as Icons from 'pages/maintenancecard/commons/Icons'

function ProductMainCardList(props) {
  return (
    <div className="delivery-collation-order-list-wrapper">
      <Search addProduct={(a) => props.addProduct(a)} />
      <Header />
      {props.products.length > 0 ? (
        <React.Fragment>
          <List products={props.products} removeProduct={(a)=>props.removeProduct(a)}/>
          <Total />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="d-flex align-items-center no-product">
            <div>
              <h4>Không có sản phẩm nào</h4>
            </div>
            <Icons.iconNoProduct></Icons.iconNoProduct>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default ProductMainCardList;

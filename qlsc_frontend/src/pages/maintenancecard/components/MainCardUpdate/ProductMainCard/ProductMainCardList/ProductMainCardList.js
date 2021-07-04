import React from "react";
import Header from "./Header/Header";
import List from "./List/List";
import Total from "./Total/Total";
import "./styles.scss";
import Search from "./Search/Search";
import * as Icons from 'pages/maintenancecard/commons/Icons'

function ProductMainCardList(props) {
  const { maintenanceCardDetails, finish, user } = props;
  return (
    <div className="main-card-product-order-list-wrapper">
      <Search user={user} finish={finish} addProduct={(a) => props.addProduct(a)} setShowModalProduct={(a)=>props.setShowModalProduct(a)}/>
      <Header />
      {maintenanceCardDetails.length > 0 ? (
        <React.Fragment>
          <List
            maintenanceCardDetails={maintenanceCardDetails}
            removeProduct={(a)=>props.removeProduct(a)}
            onUpdateStatusMaintenanceCardDetail={(a)=>props.onUpdateStatusMaintenanceCardDetail(a)}
          />
          <Total
            totalPriceMainCard={(a)=> props.totalPriceMainCard(a)}
            maintenanceCardDetails={maintenanceCardDetails}
            saveMaintenanceCard={() => props.saveMaintenanceCard()}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="d-flex align-items-center no-product">
            <div>
              <h4>Chưa có dịch vụ</h4>
            </div>
            <Icons.iconNoProduct></Icons.iconNoProduct>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
ProductMainCardList.defaultProps ={
  maintenanceCardDetails: []
}
export default ProductMainCardList;

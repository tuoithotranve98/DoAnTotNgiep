import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import SideBar from "../../components/sideBar/SideBar";
import TopBar from "../../components/topBar/TopBar";
import CustomerCreate from "../customer/components/CustomerCreate/CustomerCreate";
import CustomerUpdate from "../customer/components/CustomerUpdate/CustomerUpdate";
import CustomerDetail from "../customer/components/CustomerDetail/CustomerDetail";
import CustomerList from "../customer/components/CustomerList/CustomerList";
import MainCardCreate from "../maintenancecard/components/MainCardCreate/MainCardCreate";
import MainCardList from "../maintenancecard/components/MainCardList/MainCardList";
import ProductCreate from "../product/components/ProductCreate/ProductCreate";
import ProductUpdate from "../product/components/ProductUpdate/ProductUpdate";
import ProductList from "../product/components/ProductList/ProductList";
import ReportMain from "../report/components/ReportMain";
import StaffCreate from "../staff/components/StaffCreate/StaffCreate";
import StaffDetail from "../staff/components/StaffDetail/StaffDetail";
import StaffUpdate from "../staff/components/StaffUpdate/StaffUpdate";
import StaffList from "../staff/components/StaffList/StaffList";
import "./styles.scss";
import MainCardUpdate from "../maintenancecard/components/MainCardUpdate/MainCardUpdate";
function Dashboard(props) {
  const { showMenu } = props;
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <div
        className={showMenu ? "content-dashboard-active" : "content-dashboard"}
      >
        <SideBar />
        <TopBar />
        <Switch>
          <Route exact path="/customers" component={CustomerList} />
          <Route exact path="/customer/create" component={CustomerCreate} />
          <Route exact path="/customer/detail/:id([1-9]+[0-9]*)" component={CustomerDetail} />
          <Route exact path="/customer/update/:id" component={CustomerUpdate} />
          <Route exact path="/maintenance-card/create" component={MainCardCreate} />
          <Route exact path="/maintenance-card/detail/:id" component={MainCardUpdate} />
          <Route exact path="/maintenance-cards" component={MainCardList} />
          <Route exact path="/staffs" component={StaffList} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/product/create" component={ProductCreate} />
          <Route exact path="/product/update/:id([1-9]+[0-9]*)" component={ProductUpdate} />
          <Route exact path="/report" component={ReportMain} />
          <Route exact path="/staff/create" component={StaffCreate} />
          <Route exact path="/staff/detail/:id([1-9]+[0-9]*)" component={StaffDetail} />
          <Route exact path="/staff/update/:id([1-9]+[0-9]*)" component={StaffUpdate} />
        </Switch>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  const {
    globalUI: { showMenuTopBar },
  } = state;
  const showMenu = showMenuTopBar;
  return {
    showMenu,
  };
};
export default withRouter(connect(mapStateToProps, null)(Dashboard));

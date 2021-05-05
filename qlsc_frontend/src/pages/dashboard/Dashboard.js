/* eslint-disable no-shadow */
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
import CustomerDetail from "../customer/components/CustomerDetail/CustomerDetail";
import CustomerList from "../customer/components/CustomerList/CustomerList";
import MainCardCreate from "../maintenancecard/components/MainCardCreate/MainCardCreate";
import MainCardList from "../maintenancecard/components/MainCardList/MainCardList";
import ProductList from "../product/components/ProductList/ProductList";
import ReportMain from "../report/components/ReportMain";
import StaffCreate from "../staff/components/StaffCreate/StaffCreate";
import StaffList from "../staff/components/StaffList/StaffList";
import "./styles.scss";
function Dashboard(props) {
  const { showMenu } = props;
  console.log("showMemu", showMenu);
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <div
        className={showMenu ? "content-dashboard-active" : "content-dashboard"}
      >
        <SideBar />
        <TopBar />
        <Switch>
          <Route exact path="/customer" component={CustomerList} />
          <Route exact path="/customer/create" component={CustomerCreate} />
          <Route exact path="/customer/detail" component={CustomerDetail} />
          <Route path="/maintenance-card/create" component={MainCardCreate} />
          <Route exact path="/maintenance-card" component={MainCardList} />
          <Route exact path="/staff" component={StaffList} />
          <Route path="/product" component={ProductList} />
          <Route path="/" component={ReportMain} />
          <Route path="/staff/create" component={StaffCreate} />
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
export default connect(mapStateToProps, null)(Dashboard);

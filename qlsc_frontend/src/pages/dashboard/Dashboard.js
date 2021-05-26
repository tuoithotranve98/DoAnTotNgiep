import React, { useState } from "react";
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
import NotFoundComponent from "../../components/notfound/NotFoundComponent";
import PrivateRoute from "../../components/router/PrivateRoute";
import "./styles.scss";
import MainCardUpdate from "../maintenancecard/components/MainCardUpdate/MainCardUpdate";
import ServiceUpdate from "../service/components/ServiceUpdate/ServiceUpdate";
import ServiceCreate from "../service/components/ServiceCreate/ServiceCreate";
import ServiceList from "../service/components/ServiceList/ServiceList";
import Home from "../home/Home";
function Dashboard(props) {
  const { auth } = props;
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div
      className={showMenu ? "content-dashboard-active" : "content-dashboard"}
    >
      <SideBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <TopBar  showMenu={showMenu} setShowMenu={setShowMenu}/>
      <Switch>
        <PrivateRoute
          exact
          path="/customers"
          component={CustomerList}
        />
        <PrivateRoute
          exact
          path="/customer/create"
          component={CustomerCreate}
        />
        <PrivateRoute
          exact
          path="/customer/detail/:id([1-9]+[0-9]*)"
          component={CustomerDetail}
        />
        <PrivateRoute
          exact
          path="/customer/update/:id"
          component={CustomerUpdate}
        />
        <PrivateRoute
          exact
          path="/maintenance-card/create"
          component={MainCardCreate}
        />
        <PrivateRoute
          exact
          path="/maintenance-card/detail/:id"
          component={MainCardUpdate}
        />
        <PrivateRoute
          exact
          path="/maintenance-cards"
          component={MainCardList}
        />
        <PrivateRoute
          exact
          path="/products"
          component={ProductList}
        />
        <PrivateRoute
          exact
          path="/product/create"
          component={ProductCreate}
        />
        <PrivateRoute
          exact
          path="/product/update/:id([1-9]+[0-9]*)"
          component={ProductUpdate}
        />
        <PrivateRoute
          exact
          path="/services"
          component={ServiceList}
        />
        <PrivateRoute
          exact
          path="/service/create"
          component={ServiceCreate}
        />
        <PrivateRoute
          exact
          path="/service/update/:id([1-9]+[0-9]*)"
          component={ServiceUpdate}
        />
        <PrivateRoute exact path="/report" component={ReportMain} />
        <PrivateRoute exact path="/staffs" component={StaffList} />
        <PrivateRoute exact path="/staff/create" component={StaffCreate} />
        <PrivateRoute
          exact
          path="/staff/detail/:id([1-9]+[0-9]*)"
          component={StaffDetail}
        />
        <PrivateRoute
          exact
          path="/staff/update/:id([1-9]+[0-9]*)"
          component={StaffUpdate}
        />
        <PrivateRoute
          exact
          path="/home"
          component={Home}
        />
        <Route component={NotFoundComponent} />
      </Switch>
    </div>
  );
}
const mapStateToProps = (state) => {
  const {
    globalUI: { showMenuTopBar },
    auth,
  } = state;
  const showMenu = showMenuTopBar;
  return {
    showMenu,
    auth,
  };
};
export default withRouter(connect(mapStateToProps, null)(Dashboard));

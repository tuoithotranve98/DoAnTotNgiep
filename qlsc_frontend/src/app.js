import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
// import { getCity } from "pages/customer/actions/locationActions";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import SideBar from "./components/sideBar/SideBar";
import TopBar from "./components/topBar/TopBar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

//customer
// import CustomerList from './pages/customer/components/CustomerList';
// import AddCustomer from './pages/customer/components/AddCustomer';
// import CustomerInfo from './pages/customer/components/CustomerInfo';
// import EditCustomer from './pages/customer/components/EditCustomer';

import Modals from "./components/modal/modal";
import "./styles/app.scss";
import login from "./pages/login/login";
import MainCardList from "./pages/maintenancecard/components/MainCardList/MainCardList";
import StaffList from "./pages/staff/components/StaffList/StaffList";
import MainCardCreate from "./pages/maintenancecard/components/MainCardCreate/MainCardCreate";
import ProductList from "./pages/product/components/ProductList/ProductList";
import CustomerList from "./pages/customer/components/CustomerList/CustomerList";
import ReportMain from "./pages/report/components/ReportMain";


function App (props) {
  const { showMenu } = props;

  // useEffect(() => {
  //   props.getCity();
  // }, []);
 {/* <Route exact path="/login" component={login}/> */}
  return (
    <React.Fragment>
      <Router history={createBrowserHistory()}>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          closeButton={false}
          limit={1}
        />
        <Modals />
        <TopBar />
        <SideBar />
        <Switch>
          <div className={showMenu ? 'content-dashboard-active' : 'content-dashboard'}>
              <TopBar />
              {/* customer */}
              <Route exact path="/customer" component={CustomerList}/>
              {/* <Route exact path="/customer/create" component={AddCustomer}/>
              <Route exact path="/customer/:id/info" component={CustomerInfo}/>
              <Route exact path="/customer/:id/edit" component={EditCustomer}/> */}
              <Route exact path="/maintenance-card" component={MainCardList}/>
              <Route exact path="/maintenance-card/create" component={MainCardCreate}/>
              <Route exact path="/staff" component={StaffList}/>
              <Route exact path="/product" component={ProductList}/>
              <Route exact path="/report" component={ReportMain}/>
              {/* <Route exact path="/staff/create" component={StaffCreate}/> */}
          </div>
        </Switch>
      </Router>
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
export default withRouter(connect(mapStateToProps, null)(App));

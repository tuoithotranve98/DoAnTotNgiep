import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { getCity } from "pages/customer/actions/locationActions";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import SideBar from "./components/sideBar/SideBar";
import TopBar from "./components/topBar/TopBar";
import ProductList from "./pages/product/list/ProductList.js";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

//customer
import CustomerList from './pages/customer/components/CustomerList';
import AddCustomer from './pages/customer/components/AddCustomer';
import CustomerInfo from './pages/customer/components/CustomerInfo';
import EditCustomer from './pages/customer/components/EditCustomer';

import Modals from "./components/modal/modal";
import "./styles/app.scss";
import login from "./pages/login/login";


function App (props) {
  const { showMenu } = props;

  useEffect(() => {
    props.getCity();
  }, []);
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
              <Route exact path="/product" component={ProductList}/>
              {/* customer */}
              <Route exact path="/customer" component={CustomerList}/>
              <Route exact path="/customer/create" component={AddCustomer}/>
              <Route exact path="/customer/:id/info" component={CustomerInfo}/>
              <Route exact path="/customer/:id/edit" component={EditCustomer}/>
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
export default withRouter(connect(mapStateToProps, { getCity })(App));

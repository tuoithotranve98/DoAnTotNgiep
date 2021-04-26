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

//customer
<<<<<<< Updated upstream
import CustomerList from './pages/customer/components/CustomerList';
import AddCustomer from './pages/customer/components/AddCustomer';
import CustomerInfo from './pages/customer/components/CustomerInfo';
import EditCustomer from './pages/customer/components/EditCustomer';
=======
import CustomerList from "./pages/customer/components/CustomerList";
import AddCustomer from "./pages/customer/components/AddCustomer";
>>>>>>> Stashed changes

import Modals from "./components/modal/modal";
import "./styles/app.scss";
import login from "./pages/login/login";

<<<<<<< Updated upstream

function App (props) {
=======
function App(props) {
>>>>>>> Stashed changes
  const { showMenu } = props;

  useEffect(() => {
    props.getCity();
  }, []);

  return (
    <React.Fragment>
      <Router history={createBrowserHistory()}>
        <Modals />
<<<<<<< Updated upstream
        <SideBar />
        <div className={showMenu ? 'content-dashboard-active' : 'content-dashboard'}>
          <TopBar />
          <Switch>
            <Route exact path="/product" component={ProductList}/>
            {/* customer */}
            <Route exact path="/customer" component={CustomerList}/>
            <Route exact path="/customer/create" component={AddCustomer}/>
            <Route exact path="/customer/:id/info" component={CustomerInfo}/>
            <Route exact path="/customer/:id/edit" component={EditCustomer}/>
          </Switch>
        </div>
=======
        {/* <SideBar /> */}
        <Switch>
          <Route exact path="/" component={login} />
          <div
            className={
              showMenu ? "content-dashboard-active" : "content-dashboard"
            }
          >
            {/* <TopBar /> */}
            <Route exact path="/product" component={ProductList} />
            <Route exact path="/customer" component={CustomerList} />
            <Route exact path="/customer/create" component={AddCustomer} />
          </div>
        </Switch>
>>>>>>> Stashed changes
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

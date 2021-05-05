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
import DashBoard from "./pages/dashboard/DashBoard";
import PrivateRoute from "./utils/privateRoute";
import PrivateRoute from "./components/router/PrivateRoute";

function App (props) {
  const { showMenu } = props;

  // useEffect(() => {
  //   props.getCity();
  // }, []);
  return (
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
      <Switch>
        <Route path="/login" component={login}/>
        <PrivateRoute path="/" component={()=> <DashBoard showMenu={showMenu} />}/>
      </Switch>
    </Router>
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

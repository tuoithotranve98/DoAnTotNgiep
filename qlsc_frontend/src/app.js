import React, { useEffect } from "react";
import {
  Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import SockJsClient from 'react-stomp';
import { getCity } from "./pages/customer/actions/locationActions";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Modals from "./components/modal/modal";
import "./styles/app.scss";
import LoginPage from "./pages/login/login";
import DashBoard from "pages/dashboard/DashBoard";
import NotFoundComponent from "./components/notfound/NotFoundComponent";
import { checkInfoUser } from "./pages/login/actions/loginAction";
import PrivateRoute from "./components/router/PrivateRoute";
import { SOCKET_URL_V2 } from "./constants/api";
import { getStaffsByRepairman } from "./actions/commons";
import storage from "./utils/storage";
import history from './utils/history';

function App(props) {
  const { showMenu } = props;
  useEffect(() => {
    const token = storage.get("token", false);
    if (!token) history.push("/login");
    if (token && window.location.pathname) {
      history.push(window.location.pathname);
    }
    if (token) {
      props.onGetCity();
      props.getStaffsByRepairman();
    }
  }, []);

  const onConnected = () => {
    //window.alert("Connected!!")
  }

  const onMessageReceived = (msg) => {
    window.alert("check msg: ", msg);
  }

  const onDisconnect = () => {
    //window.alert("Disconnected!");
  }
  return (
    <Router history={history}>
      <SockJsClient
        url={SOCKET_URL_V2}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={onDisconnect}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
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

        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/" component={() => <DashBoard showMenu={showMenu} />} />
        <Route component={NotFoundComponent} />
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
const mapDispatchToProps = (dispatch) => ({
  onCheckInfoUser: (token) => dispatch(checkInfoUser(token)),
  onGetCity: () => dispatch(getCity()),
  getStaffsByRepairman: () => dispatch(getStaffsByRepairman()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { getCity } from "./pages/customer/actions/locationActions";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Modals from "./components/modal/modal";
import "./styles/app.scss";
import LoginPage from "./pages/login/login";
import DashBoard from "./pages/dashboard/DashBoard";
import PrivateRoute from "./components/router/PrivateRoute";
import storage from "./utils/storage";
import { checkInfoUser } from "./pages/login/actions/loginAction";
import pushstate from "utils/pushstate";

function App(props) {
  const { showMenu } = props;

  useEffect(() => {
    const token = storage.get("token", false);
    if (token) {
      props.onCheckInfoUser(token).then((json) => {
        if (json && json.role) {
          pushstate(props.history, "/");
        } else {
          pushstate(props.history, "/login");
        }
      });
    } else {
      pushstate(props.history, "/login");
    }
    props.onGetCity();
  }, []);

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
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={() => <DashBoard showMenu={showMenu} />} />
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
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { getCity } from "pages/customer/actions/locationActions";
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import SideBar from './components/sideBar/SideBar';
import TopBar from './components/topBar/TopBar';
import ProductList from './pages/product/list/ProductList.js';

//customer
import CustomerList from './pages/customer/components/CustomerList';
import AddCustomer from './pages/customer/components/AddCustomer';

import Modals from './components/modal/modal';
import './styles/app.scss';

function App (props) {
  const { showMenu } = props;

  useEffect(() => {
    props.getCity();
  }, [])

  return (
    <React.Fragment>
      <Router history={createBrowserHistory()}>
        <Modals />
        <SideBar />
        <div className={showMenu ? 'content-dashboard-active' : 'content-dashboard'}>
          <TopBar />
          <Switch>
            <Route exact path="/product" component={ProductList}/>
            <Route exact path="/customer" component={CustomerList}/>
            <Route exact path="/customer/create" component={AddCustomer}/>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => {
  const {
    globalUI: { showMenuTopBar }
  } = state
  const showMenu = showMenuTopBar
  return {
    showMenu
  }
}
export default withRouter(connect(mapStateToProps, { getCity })(App))

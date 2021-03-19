import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux'
import SideBar from './components/sideBar/SideBar'
import TopBar from './components/topBar/TopBar'
import ProductList from './pages/product/list/ProductList.js'
import Modals from './components/modal/modal'
import './styles/app.scss'

function App (props) {
  const { showMenu } = props
  console.log("show", showMenu);
  return (
    <React.Fragment>
      <Router history={createBrowserHistory()}>
        <Modals />
        <SideBar />
        <div className={showMenu ? 'content-dashboard-active' : 'content-dashboard'}>
          <TopBar />
          <Switch>
            <Route exact path="/product" component={ProductList}/>
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
export default withRouter(connect(mapStateToProps, null)(App))


import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/reduxStore'
import App from './app'
import 'styles/main.scss'

const store = configureStore()
function Root () {
  return (
    <Provider store={store}>
      <Router basename="">
        <App />
      </Router>
    </Provider>
  )
}
ReactDOM.render(
  <Root/>,
  document.getElementById('app')
)

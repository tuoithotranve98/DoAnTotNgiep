import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log("zozooooo");
    return (
        <Route {...rest} render={props => (
            true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )}/>
    )
}

export default PrivateRoute;
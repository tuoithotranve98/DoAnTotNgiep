import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

{
  /* 
1: 
2:
3:
*/
}

export const isLogin = (user, location, props) => {
  return user && user.role;
};

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin(auth.user, props.location, props) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => ({ auth: state.auth });
export default withRouter(connect(mapStateToProps)(PrivateRoute));

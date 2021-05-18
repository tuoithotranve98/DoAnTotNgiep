import React from "react";
import storage from "../../utils/storage";
import { Route, Redirect, withRouter } from "react-router-dom";

const repairStaff = ["/maintenance-cards", "/products"];
const coordinator = [
  "/maintenance-cards",
  "/maintenance-card/create",
  "/maintenance-card/detail",
  "/products",
  "/customers",
  "/customer/detail",
  "/customer/create",
  "/customer/update",
  "/staffs",
];

const handlePathname = (str) => {
  if (str.includes("/customer/detail")) return "/customer/detail";
  if (str.includes("/customer/update/")) return "/customer/update";
  if (str.includes("/maintenance-card/detail"))
    return "/maintenance-card/detail";
  return str;
};

export const isLogin = () => {
  const pathname = window.location.pathname;
  const user = storage.getExactType("user", false);
  if (!user) return;
  const role = user.role;
  if (role === 1 && !coordinator.includes(handlePathname(pathname))) {
    return "not-found";
  }
  if (role === 2 && !repairStaff.includes(pathname)) {
    return "not-found";
  }
  return role;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() === "not-found" ? (
          <Redirect
            to={{
              pathname: "/not-found",
              state: { from: props.location },
            }}
          />
        ) : isLogin() ? (
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

export default withRouter(PrivateRoute);

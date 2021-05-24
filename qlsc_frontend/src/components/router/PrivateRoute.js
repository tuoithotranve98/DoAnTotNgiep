import React from "react";
import storage from "../../utils/storage";
import { Route, Redirect, withRouter } from "react-router-dom";

const repairStaff = ["/maintenance-cards", "/products", "/maintenance-card/detail",];
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
    return "404";
  }
  if (role === 2 && !repairStaff.includes(pathname)) {
    return "404";
  }
  return role;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() === "404" ? (
          <Redirect
            to={{
              pathname: "/404",
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

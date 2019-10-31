import React from "react";
import Loadable from "react-loadable";
//eslint-disable-next-line
import { BrowserRouter as Router, Route } from "react-router-dom";

export const Loading = props => {
  if (props.error) {
    return <div>Error! {props.error}</div>;
  } else {
    return (
      <div>
        <h3>Carregando...</h3>
      </div>
    );
  }
};
export const RouteWithSubRoutes = route => (
  <Route
    exact={route.exact}
    path={route.path}
    render={props => {
      if (route.hasOwnProperty("beforeEnter")) {
        route.beforeEnter(props);
      }
      return <route.component {...props} routes={route.routes} />;
    }}
  />
);
const Bairros = Loadable({
  loader: () => import("../views/Bairros"),
  loading: Loading
});

const Crime = Loadable({
  loader: () => import("../views/Crime"),
  loading: Loading
});

export const routes = [
  {
    path: "/crime",
    component: Crime,
    exact: false
  },
  {
    path: "/bairros",
    component: Bairros,
    exact: false
  }
];

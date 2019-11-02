import React from "react";
//eslint-disable-next-line
import { BrowserRouter as Router, Route } from "react-router-dom";

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
import Bairros from "../views/Bairros";

import Crime from "../views/Crime";

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

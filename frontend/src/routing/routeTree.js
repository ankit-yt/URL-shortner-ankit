import { createRootRoute } from "@tanstack/react-router";
import App from "../App";
import { authPageRoute } from "./authPageRoute";
import { dashboardPageRoute } from "./dashboardPageRoute";
import { homePageRoute } from "./homePageRoute";
export const rootRoute = createRootRoute({
  component: App ,
});

export const routeTree = rootRoute.addChildren([
  homePageRoute,
  authPageRoute,
  dashboardPageRoute,
]);

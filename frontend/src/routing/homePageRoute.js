 import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import Home from "../pages/Home"

export const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,

})

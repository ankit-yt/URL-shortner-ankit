import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import Auth from "../pages/Auth"

export const authPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: Auth
})

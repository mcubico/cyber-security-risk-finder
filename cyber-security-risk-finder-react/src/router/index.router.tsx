/* eslint-disable react-refresh/only-export-components */
//#region IMPORTS

import { Navigate, Route, RouteObject, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RiskFinderPage from "../pages/risk-finder.page"
import LoginPage from "../pages/login.page"
import PrivateRoutes from "../components/molecules/PrivateRoutes";
import { Suspense, lazy } from "react";
import FullScreenLoader from "../components/atoms/FullScreenLoader";
import Layout from "../components/templates/layout";
import HomePage from "../pages/home.page";
import AuthenticationGuard from "../components/molecules/AuthenticationGuard";

//#endregion

const Loadable = (Component: React.ComponentType<any>) =>
  (props: JSX.IntrinsicAttributes) => (
    <Suspense fallback={<FullScreenLoader />}>
      <Component {...props} />
    </Suspense>
  )

const UnauthorizePage = Loadable(
  lazy(() => import('../pages/errors/unauthorize.page'))
)

const authRoutes: RouteObject = {
  path: '*',
  children: [
    {
      path: 'login',
      element: <LoginPage />,
    }
  ],
}

const normalRoutes: RouteObject = {
  path: '*',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Navigate to='/home' />,
    },
    {
      path: 'home',
      element: <HomePage />,
    },
    {
      path: 'risk-finder',
      element: <AuthenticationGuard allowedRoles={['admin', 'guest']} />,
      children: [
        {
          path: '',
          element: <RiskFinderPage />
        }
      ]
    },
    {
      path: 'unauthorized',
      element: <UnauthorizePage />,
    },
  ],
}

const routes: RouteObject[] = [authRoutes, normalRoutes]

export default routes
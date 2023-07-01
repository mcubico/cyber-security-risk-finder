//#region IMPORTS

import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootPage from "../pages/RootPage"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"

//#endregion

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navigate to={import.meta.env.VITE_HOME_ROUTE} />} />
      <Route
        path={import.meta.env.VITE_HOME_ROUTE}
        element={<RootPage />}
      >
        <Route index element={<HomePage />} />
        <Route path={import.meta.env.VITE_LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={import.meta.env.VITE_HOME_ROUTE} element={<HomePage />} />
      </Route>
    </>
  )
)

export default router
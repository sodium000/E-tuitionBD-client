import { createBrowserRouter } from "react-router";
import HomePageLayout from "../Layout/HomePageLayout";
import MainHomePage from "../HomePage/MainHomePage/MainHomePage";
import AuthPageLayout from "../Layout/AuthPageLayout";
import Login from "../AuthPage/Login/Login";
import Registration from "../AuthPage/Registration/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePageLayout,
    children : [
        {
            index : true,
            Component:MainHomePage
        },
    ]
  },
  {
    path: "/",
    Component: AuthPageLayout,
    children : [
        {
            path :"login",
            Component:Login
        },
        {
            path :"registration",
            Component: Registration,
            loader: () => fetch('/warehouses.json').then(res => res.json())
        },
    ]
  },
]);

export default router ;
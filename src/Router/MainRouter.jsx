import { createBrowserRouter } from "react-router";
import HomePageLayout from "../Layout/HomePageLayout";
import MainHomePage from "../HomePage/MainHomePage/MainHomePage";

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
]);

export default router ;
import { createBrowserRouter } from "react-router";
import HomePageLayout from "../Layout/HomePageLayout";
import MainHomePage from "../HomePage/MainHomePage/MainHomePage";
import AuthPageLayout from "../Layout/AuthPageLayout";
import Login from "../AuthPage/Login/Login";
import Registration from "../AuthPage/Registration/Registration";
import AddPost from "../Component/AddPost/AddPost";
import TutionPost from "../Component/TutionPost/TutionPost";
import PrivateRoute from "./PrivateRoute";
import Tutors from "../Component/Tutors/Tutors";
import ViewDetails from "../Component/ViewDetails/ViewDetails";
import TutorDetails from "../Component/TutorDetails/TutorDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePageLayout,
    children : [
        {
            index : true,
            Component:MainHomePage
        },
        {
            path : "AddPost",               
            element : <PrivateRoute><AddPost></AddPost></PrivateRoute>,
            loader: () => fetch('/warehouses.json').then(res => res.json())
        },
        {
            path : "TutionPost",
            Component:TutionPost,
        },
        {
            path : "Tutors",
            Component:Tutors,
        },
        {
            path : "viewdetails/:id",
            Component:ViewDetails,
        },
        {
            path : "TutorDetails/:id/tutor",
            Component:TutorDetails,
        }
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
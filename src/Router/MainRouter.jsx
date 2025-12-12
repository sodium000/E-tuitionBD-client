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
import TutorApplicationForm from "../Component/TutorApplicationForm/TutorApplicationForm";
import DashboardLayout from "../Layout/DashboardLayout";
import PostTable from "../StudentDashbord/EditModal";
import ApplicationTable from "../StudentDashbord/ApplicationTable";
import PaymentTable from "../StudentDashbord/PaymentTable";
import ProfileSection from "../StudentDashbord/ProfileSection";

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomePageLayout,
        children: [
            {
                index: true,
                Component: MainHomePage
            },
            {
                path: "TutionPost",
                Component: TutionPost,
            },
            {
                path: "Tutors",
                Component: Tutors,
            },
            {
                path: "viewdetails/:id",
                Component: ViewDetails,
            },
            {
                path: "TutorDetails/:id/tutor",
                Component: TutorDetails,
            },
            {
                path: "Tutorapply",
                Component: TutorApplicationForm,
            }
        ]
    },
    {
        path: "/",
        Component: AuthPageLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "registration",
                Component: Registration,
                loader: () => fetch('/warehouses.json').then(res => res.json())
            },
        ]
    },
    {

        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children : [
            {
                path: "AddPost",
                element: <PrivateRoute><AddPost></AddPost></PrivateRoute>,
                loader: () => fetch('/warehouses.json').then(res => res.json())
            },
            {
                path: "PostTable",
                element: <PrivateRoute><PostTable></PostTable></PrivateRoute>,
            },
            {
                path: "applicationTable",
                element: <PrivateRoute><ApplicationTable></ApplicationTable></PrivateRoute>,
            },
            {
                path: "paymentTable",
                element: <PrivateRoute><PaymentTable></PaymentTable></PrivateRoute>,
            },
            {
                path: "profileSection",
                element: <PrivateRoute><ProfileSection></ProfileSection></PrivateRoute>,
            },
        ]
    }
]);

export default router;
import { createBrowserRouter } from "react-router-dom";
import SignupForm from "../pages/SignupForm";
import SigninForm from "../pages/SigninForm";
import TeamManagement from "../pages/TeamManagement";
import Detail from "../pages/Detail";

export const routers= createBrowserRouter([
    {
        path:'/',
        element:<SignupForm></SignupForm>
    },
    {
        path:'/signupForm',
        element:<SignupForm></SignupForm>
    },
    {
        path:'/signinForm',
        element:<SigninForm></SigninForm>
    },
    {
        path:'/projects',
        element:<TeamManagement/>
    },
    {
        path:'/detail',
        element:<Detail/>
    }
])
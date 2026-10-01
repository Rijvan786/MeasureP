import React from 'react'
import {createBrowserRouter} from "react-router-dom"
import Home from "../features/auth/component/Home.jsx"
import Register from '../features/auth/pages/Register.jsx'
import Login from '../features/auth/pages/Login.jsx'
import View from '../features/auth/component/View.jsx'
import CustomerProfile from '../features/auth/component/CustomerProfile.jsx'
import TechnicianDashboard from '../features/technician/pages/TechnicianDashboard.jsx'
import TechnicianProfile from '../features/technician/component/Technician-Profile.jsx'
import TechnicianNotification from "../features/technician/component/TechnicianNotification.jsx"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        /* Dynamic route — /view/apple, /view/dell, /view/hp, /view/lenovo */
        path: "/view/:brandId",
        element: <View/>
    },
    {
        path: "/customer/profile",
        element: <CustomerProfile/>
    },
    {
        path: "/Technician-Dashboard",
        element: <TechnicianDashboard/>
    },
    {
        path: "/Technician-Profile",
        element: <TechnicianProfile/>
    },
    {
        path: "/TechnicianNotification",
        element: <TechnicianNotification/>
    }
])

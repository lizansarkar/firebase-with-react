import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "./Root.jsx";
import Home from "../main-pages/Home.jsx";
import About from "../main-pages/About.jsx";
import Login from "../main-pages/Login.jsx";
import Register from "../main-pages/Register.jsx";
import Personalinfo from "../main-pages/personal-page/Personalinfo.jsx";
import PrivateRoute from "../main-pages/personal-page/PrivateRoute.jsx";
import Order from "../main-pages/personal-page/Order.jsx";
import Profile from "../main-pages/personal-page/Profile.jsx";
import Dashboard from "../main-pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home />, index: true },
      { path: "/dashboard", element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>},
      { path: "/about", element: <About></About> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      { path: "/personal", element: <Personalinfo></Personalinfo>},
      { path: "/order", element: <PrivateRoute><Order></Order></PrivateRoute>},
      { path: "/profile", element: <PrivateRoute><Profile></Profile></PrivateRoute>}
    ],
  },
]);

export default router;

import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "./Root.jsx";
import Home from "../main-pages/Home.jsx";
import About from "../main-pages/About.jsx";
import Login from "../main-pages/Login.jsx";
import Register from "../main-pages/Register.jsx";
import Personalinfo from "../main-pages/personal-page/Personalinfo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home />, index: true },
      { path: "/about", element: <About></About> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      { path: "/personal", element: <Personalinfo></Personalinfo>}
    ],
  },
]);

export default router;

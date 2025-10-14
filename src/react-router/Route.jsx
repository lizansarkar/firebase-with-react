import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "./Root.jsx";
import Home from "../main-pages/Home.jsx";
import Contact from "../main-pages/Contact.jsx";
import About from "../main-pages/About.jsx";
import Register from "../main-pages/Register.jsx";
import Login from "../main-pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home />, index: true },
      { path: "/about", element: <About></About> },
      { path: "/register", element: <Register></Register> },
      { path: "/login", element: <Login></Login> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

export default router;

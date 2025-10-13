import React from 'react'
import { createBrowserRouter } from 'react-router';
import Root from './Root.jsx';
import Home from '../main-pages/Home.jsx';
import Contact from '../main-pages/Contact.jsx';
import About from '../main-pages/About.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home />, index: 0 },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About></About>}
    ],
  },
]);

export default router
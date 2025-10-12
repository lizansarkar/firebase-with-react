import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './react-router/Root.jsx';
import Home from './main-pages/Home.jsx';
import Contact from './main-pages/Contact.jsx';

import { ToastContainer, toast } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home />, index: 0 },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);


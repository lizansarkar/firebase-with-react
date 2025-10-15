import React, { StrictMode, createContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./react-router/Route";

export const AuthContext = createContext(null);

const userInfo = {
  email: "lizansarkar12@gmail.com",
  password: "nothing204",
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext.Provider value={userInfo}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  </StrictMode>
);


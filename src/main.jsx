import React, { StrictMode, createContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./react-router/Route";
import AuthProvider from "./context/auth-context/AuthProvider";

// export const AuthContext = createContext(null);

// const userInfo = {
//   email: "lizansarkar12@gmail.com",
//   password: "nothing204",
// };

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthContext.Provider value={userInfo}> */}

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

    {/* </AuthContext.Provider> */}
  </StrictMode>
);

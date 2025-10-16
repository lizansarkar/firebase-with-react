import React, { use } from 'react'
import { AuthContext } from '../../context/auth-context/AuthContext'
import { Navigate, useLocation } from 'react-router';

export default function PrivateRoute({children}) {

  const {user, loading} = use(AuthContext);

  // const location = useLocation();
  // console.log(location)

  if(loading) {
    return <span className="loading loading-bars loading-xl"></span>
  }

  if(user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>
}

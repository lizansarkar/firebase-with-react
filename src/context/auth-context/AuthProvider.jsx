import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("when currentUser true", currentUser);
        setUser(currentUser);
      }
      setLoading(false)
      return () => {
        unsubscribe();
      }
    });
  }, []);

  const signOutUser = () => {
    setLoading(true)
    return signOut(auth)
  }

  const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    setUser,
    signOutUser,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
}

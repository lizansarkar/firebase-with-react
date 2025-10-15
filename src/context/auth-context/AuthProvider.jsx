import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useState(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("when currentUser true", currentUser);
        setUser(currentUser);
      }
      return () => {
        unsubscribe();
      }
    });
  }, []);

  const signOutUser = () => {
    return signOut(auth)
  }

  const userInfo = {
    user,
    createUser,
    signInUser,
    signOutUser,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
}

import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./contact-component/firebase.config";

export default function Login() {
  const [error, setError] = useState()
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("")

    signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log("youre rsponse user",res.user)
    })
    .catch((error) => {
      console.log(error)
      setError(error.message)
    })
  }
  
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center">
      <form onSubmit = { handleLogin }>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>

      {
        error && <p className="text-red-500">{error}</p>
      }
    </div>
  );
}

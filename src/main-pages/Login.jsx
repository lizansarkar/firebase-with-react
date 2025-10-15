import React, { use, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/auth-context/AuthContext";

export default function Login() {
  const { signInUser } = use(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log("email and password ashar kotha", email, password)

    signInUser(email, password)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-sm">
        <h1 className="py-10 font-semibold text-3xl ">Login Now</h1>
        <div className="card-body bg-[#ffffff] text-[#000000] rounded-md">
          <form onSubmit={handleLogin}>
            <fieldset className="fieldset">
              {/* email field */}
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              {/* password field */}
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login Now</button>
            </fieldset>
          </form>
          <span>
            New to our website ? please{" "}
            <Link to="/register" className="text-blue-500 underline">
              Register
            </Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

import React, { use, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MagicEffect from "../reuseble-component/MagicEffect";
import { Link } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "../context/auth-context/AuthContext";
// import { AuthContext } from "../main";

const Register = () => {
        
    const { createUser } = use(AuthContext);

    const handleRegister = (event) => {
    event.preventDefault()

    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log("my context email and password", email, password)

    createUser(email, password)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-sm">
        <h1 className="py-10 font-semibold text-3xl ">Register Now</h1>
        <div className="card-body bg-[#ffffff] text-[#000000] rounded-md">
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              {/* name field */}
              {/* <label className="label">Name</label>
              <input type="text" name="name" className="input" placeholder="Type your name" /> */}
              {/* email field */}
              <label className="label">Email</label>
              <input type="email" name="email" className="input" placeholder="Email" />
              {/* password field */}
              <label className="label">Password</label>
              <input type="password" name="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Register Now</button>
            </fieldset>
          </form>
          <span>Allready have an account ? please <Link to="/login" className="text-blue-500 underline">Log in</Link> </span>
        </div>
      </div>
    </div>
  );
};

export default Register;

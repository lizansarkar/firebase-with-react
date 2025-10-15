
import React, { useState } from "react";
import { Link } from "react-router";

export default function Login() {
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-sm">
        <h1 className="py-10 font-semibold text-3xl ">Register Now</h1>
        <div className="card-body bg-[#ffffff] text-[#000000] rounded-md">
          <form>
            <fieldset className="fieldset">
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
          <span>New to our website ? please <Link to="/register" className="text-blue-500 underline">Register</Link> </span>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MagicEffect from "../../reuseble-component/MagicEffect";

import {
  MapPin,
  Phone,
  Mail,
  Youtube,
  Facebook,
  Instagram,
  Linkedin,
  MailCheck,
  LogOut,
} from "lucide-react";

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase.config";


const ContactForm = () => {

  const [user, setUser] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");

  const [success, setSuccess] = useState(false)

  const googleprovider = new GoogleAuthProvider();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required!");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required!");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email!");
      return false;
    }
    if (!formData.message.trim()) {
      toast.error("Message is required!");
      return false;
    }
    return true;
  };

  const handleGoogleSignIn = () => {
    console.log("Google verification click");

    signInWithPopup(auth, googleprovider)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    console.log("You clicked sign out button");
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Data:", formData);
      toast.success("Message Sent Successfully!");
      setFormData({ name: "", email: "", password: "", message: "" });

      const { email, password } = formData;

      setSuccess(false)
      setErrorMsg("")

      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          console.log("New user created:", result.message)
          setSuccess(true)
        })
        .catch((error) => {
          console.log("this is the error ", error.message);
          const errorText = error.message;
          setErrorMsg(errorText)
        });
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-6 z-100">
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
        <MagicEffect particleColor="255, 255, 255" glowColor="0, 200, 255">
          {/* Left Side More Information */}

          <div className="border border-gray-300 md:border-none shadow-lg rounded-2xl p-6 space-y-6 order-2 md:order-1">
            <h2 className="text-2xl font-bold text-[#ffffff]">
              More Information
            </h2>

            <div className="flex items-center space-x-3">
              <MapPin className="text-[#ffffff]" />
              <p className="text-[#ffffff]">
                House 02, Road 01, Block – A, West Dhanmondi Housing, Bosila,
                Mohammadpur, Dhaka, Bangladesh
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="text-[#ffffff]" />
              <p className="text-[#ffffff]">+8801581511905</p>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="text-[#ffffff]" />
              <p className="text-[#ffffff]">official@skillparadox.com</p>
            </div>

            {/* react withe firebase */}
            <div>
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="p-1.5 bg-[#7638e8] rounded-full hover:bg-[#000000] transition-colors cursor-pointer"
                >
                  <LogOut size={22} color="#ffffff"></LogOut>
                </button>
              ) : (
                <button
                  onClick={handleGoogleSignIn}
                  className="p-1.5 bg-[#7638e8] rounded-full hover:bg-[#000000] transition-colors cursor-pointer"
                >
                  <MailCheck size={22} color="#ffffff"></MailCheck>
                </button>
              )}

              {user && (
                <div>
                  <img src={user.photoURL} alt="" />
                  <h1 className="text-[#ffffff]">{user.displayName}</h1>
                </div>
              )}
            </div>
          </div>
        </MagicEffect>
        <MagicEffect particleColor="255, 255, 255" glowColor="0, 200, 255">
          {/* Right Side Contact Form */}
          <div className="bg-[#060010] border border-gray-300 md:border-none shadow-lg rounded-2xl p-6 order-1 md:order-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-2xl font-bold text-center text-[#ffffff]">
                Contact Us
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:text-[#ffffff] focus:outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:text-[#ffffff] focus:outline-none"
              />

              {/* Password Field */}
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:text-[#ffffff] focus:outline-none"
              />

              <textarea
                name="message"
                placeholder="Write your message..."
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:text-[#ffffff] focus:outline-none"
              />

              <button
                type="submit"
                className="w-full bg-[#7638e8] text-white font-semibold py-3 rounded-xl shadow-md"
              >
                Ragister Now
              </button>

              {
                success && <p className="text-green-500">Acount register successfully</p>
              }

              {
                errorMsg && <p className="text-red-500">please : {errorMsg}</p>
              }
            </form>

            {/* Social Sign-in Section */}
            <div className="mt-6 text-center">
              <p className="text-[#ffffff] mb-3">Follow us</p>
              <div className="flex justify-center space-x-3">
                <a
                  href=""
                  className="p-1.5 bg-[#7638e8] rounded-full hover:bg-[#000000] transition-colors cursor-pointer"
                >
                  <Facebook size={22} color="#ffffff"></Facebook>
                </a>

                <a
                  href=""
                  className="p-1.5 bg-[#7638e8] rounded-full hover:bg-[#000000] transition-colors cursor-pointer"
                >
                  <Youtube size={22} color="#ffffff"></Youtube>
                </a>

                <a
                  href=""
                  className="p-1.5 bg-[#7638e8] rounded-full hover:bg-[#000000] transition-colors cursor-pointer"
                >
                  <Instagram size={22} color="#ffffff"></Instagram>
                </a>

                <a
                  href=""
                  className="p-1.5 bg-[#7638e8] rounded-full hover:bg-[#000000] transition-colors cursor-pointer"
                >
                  <Linkedin size={22} color="#ffffff"></Linkedin>
                </a>
              </div>
            </div>
          </div>
        </MagicEffect>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ContactForm;

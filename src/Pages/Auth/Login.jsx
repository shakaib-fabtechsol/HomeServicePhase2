import React, { useState, useEffect } from "react";
import google from "../../assets/img/google.png";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";

function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="w-full justify-center flex h-[100dvh]">
      <div className="flex flex-col justify-center min-h-[100dvh] w-full max-w-[700px]">
        <div className="px-[15px] sm:px-[30px] h-full lg:px-[50px] xl:px-[130px]">
          <div className="flex justify-center ">
            <img
              src={logo}
              alt=""
              className="px-5 py-4 w-[170px] sm:w-[200px] md:w-[270px]"
            />
          </div>
          <h2 className="font-semibold text-center text-[#181D27] text-2xl sm:text-3xl">
            Log in to your account
          </h2>
          <p className="font-normal text-center myblack mb-5 mt-2">
            Welcome! Please enter your details.
          </p>

          <form action="/provider/dashboard">
            <div className="my-3">
              <label
                htmlFor="email"
                className="myblack block w-full font-medium"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                placeholder="user123@gmail.com"
                className="mt-1 w-full border px-3 rounded-lg py-3 focus-none"
                required
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="password"
                className="myblack block w-full font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder=""
                className="mt-1 w-full border px-3 rounded-lg py-3 focus-none"
                required
              />
            </div>

            <div className="flex flex-wrap mb-3 justify-end items-center">
              <Link
                to="/forgotpassword"
                className="block font-medium text-blue"
              >
                Forgot password
              </Link>
            </div>

            <button
              type="submit"
              className="text-white font-semibold px-3 py-3 bg-blue w-full mt-3 rounded-lg"
            >
              Sign in
            </button>
          </form>

          <Link
            to="#"
            className="border rounded-lg my-2 py-3 px-3 sm:px-3 flex justify-center items-center"
          >
            <div className="flex">
              <img src={google} alt="google" className="me-2" />
              <span className="font-semibold text-xs sm:text-base">
                Sign in with Google
              </span>
            </div>
          </Link>

          <p className="text-center block mt-5 pb-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

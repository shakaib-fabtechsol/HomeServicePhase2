import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";

export default function ForgotPassword() {
  useEffect(() => {
    document.title = "Forgot password";
  }, []);

  return (
    <div className="w-full justify-center flex h-[100dvh]">
      <div className="flex flex-col justify-center min-h-[100dvh] w-full max-w-[700px]">
        <div className="px-[15px] sm:px-[30px] py-3 lg:px-[50px] xl:px-[130px]">
          <div className="flex justify-center pt-10">
            <img
              src={logo}
              alt=""
              className="px-5 py-4 w-[170px] sm:w-[200px] md:w-[270px]"
            />
          </div>
          <h2 className="font-semibold text-center text-[#181D27] text-2xl sm:text-3xl">
            Recover your account
          </h2>
          <p className="font-normal text-center myblack mb-5 mt-2">
            Please enter your email to proceed.
          </p>
          <form action="/newpassword">
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
            <button
              type="submit"
              className="text-white font-semibold px-3 py-3 bg-blue w-full mt-3 rounded-lg"
            >
              Continue
            </button>
          </form>
          <Link
            to="/login"
            className="border rounded-lg my-2 py-3 px-3 sm:px-3 flex justify-center items-center"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import service from "../../assets/img/service.png";
import { Link } from "react-router-dom"; // Corrected import
import logo from "../../assets/img/logo.png";

function Register() {
  React.useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <div className="">
      <div className="w-full grid md:grid-cols-2 h-[100dvh] overflow-y-auto">
        <div className="min-h-[100dvh] flex flex-col justify-center">
          <div className="overflow-y-auto">
            <div className="">
              <img
                src={logo}
                alt=""
                className="px-5 py-4 size-48 object-contain mx-auto"
              />
            </div>
            <div className="px-[15px] sm:px-[30px] lg:px-[50px] xl:px-[80px] py-4">
              <h2 className="font-semibold text-[#181D27] text-darkblue text-3xl">
                Sign up
              </h2>
              <p className="font-normal myblack mt-2">
                Welcome! Please enter your details.
              </p>

              <div className="border px-3 mt-4 py-3 rounded-lg">
                <p className="font-medium">Looking for Service?</p>
                <Link
                  to="/signup"
                  state={{ userType: "1" }} 
                  className="btn-blue font-semibold rounded-lg px-3 py-2 w-full text-[#fff] mt-3 flex justify-center"
                >
                  Register as a Customer
                </Link>
              </div>

              <div className="border px-3 mt-4 py-3 rounded-lg">
                <p className="font-medium">Looking for Work?</p>
                <Link
                  to="/signup"
                  state={{ userType: "2" }} 
                  className="btn-blue font-semibold rounded-lg px-3 py-2 w-full text-[#fff] mt-3 flex justify-center"
                >
                  Register as a Service Provider
                </Link>
              </div>

              <p className="text-center block mt-5">
                Already have an account?{" "}
                <Link to="/" className="text-blue">
                  Login
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <img
            src={service}
            alt=""
            className="w-full h-[100dvh] object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;

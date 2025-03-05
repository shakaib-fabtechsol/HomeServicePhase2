import React from "react";
import { Link } from "react-router-dom";
import { PolicySection } from "./PolicySection";
import { usePrivacyPolicy } from "./usePrivacyPolicy";
import {
  PRIVACY_POLICY_SECTIONS,
  LAST_UPDATED_DATE,
  CONTACT_EMAIL,
} from "./data";
import logo from "../../../assets/img/logo.png";
import Loader from "../../../Components/MUI/Loader";

function PrivacyPolicyModule() {
  const { termsAccepted, handleTermsAccept, handleSubmit, userId, isLoading } =
    usePrivacyPolicy();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="mycontainer">
      <Link to="/signup">
        <img
          src={logo}
          alt="logo"
          className="p-[20px] size-48 object-contain cursor-pointer"
        />
      </Link>

      <div className="max-w-[650px] justify-self-center">
        <div className="text-center mb-8">
          <p className="font-semibold text-[#0F91D2]">
            Last Updated: {LAST_UPDATED_DATE}
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold text-center">
            Privacy Policy
          </h1>
          <p className="text-[#535862] mt-4">
            These Terms and Conditions outline the relationship between Home Pro
            Deals ("Company," "we," "us," or "our") and users of our platform,
            including Service Providers ("Providers") and Consumers ("Clients").
            By accessing or using the Home Pro Deals platform, you agree to
            these Terms and Conditions.
          </p>
        </div>

        {PRIVACY_POLICY_SECTIONS.map((section) => (
          <PolicySection key={section.id} {...section} />
        ))}

        <p className="my-6 sm:my-8">
          For any inquiries or assistance, please contact us at{" "}
          <Link className="text-[#0F91D2]">info@HomeProDeals.com</Link>.
        </p>

        <form onSubmit={handleSubmit} className="mb-8">
          <input type="hidden" id="userid" value={userId || ""} />

          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={handleTermsAccept}
              className="me-2"
            />
            <label htmlFor="terms" className="font-medium">
              I accept the{" "}
              <Link to="/privacyPolicy" className="text-blue underline">
                Terms of Service
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={!termsAccepted}
            className={`text-white mb-3 font-semibold px-3 py-3 w-full mt-3 rounded-lg ${
              termsAccepted
                ? "bg-blue hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Accept & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default PrivacyPolicyModule;

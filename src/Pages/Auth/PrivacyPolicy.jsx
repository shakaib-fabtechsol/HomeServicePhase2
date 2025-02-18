import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import { Link, useLocation ,useNavigate } from "react-router-dom";

function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy";
  }, []);
  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate ();

  useEffect(() => {}, [userId]);

  const [termsAccepted, setTermsAccepted] = useState(false);

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
        <p className="text-center font-semibold text-[#0F91D2]">
          Last Updated: December 27, 2024
        </p>
        <h1 className="text-3xl sm:text-5xl font-semibold text-center">
          Privacy Policy
        </h1>
        <p className="text-[#535862] mt-4">
          These Terms and Conditions outline the relationship between Home Pro
          Deals ("Company," "we," "us," or "our") and users of our platform,
          including Service Providers ("Providers") and Consumers ("Clients").
          By accessing or using the Home Pro Deals platform, you agree to these
          Terms and Conditions.
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          1. OVERVIEW OF HOME PRO DEALS PLATFORM
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Home Pro Deals facilitates connections between Providers and Clients
          through the posting and purchasing of service or product Deals.
          Providers list their offerings ("Deals"), and Clients purchase them
          directly. Home Pro Deals collects a percentage of each transaction for
          its services.
        </p>
        <h3 className="text-lg sm:text-xl  font-semibold mt-6 sm:mt-8">
          Key Responsibilities:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Providers are solely responsible for fulfilling Deals purchased by
            Clients.
          </li>
          <li>
            Home Pro Deals functions as an intermediary and is not a party to
            the transactions between Providers and Clients.
          </li>
        </ul>
        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          2. PARTICIPATION REQUIREMENTS
        </h2>
        <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
          Providers:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Must maintain all necessary licenses and permits for their services.
          </li>
          <li>
            Must comply with all applicable local, state, and federal laws.
          </li>
          <li>
            Must provide accurate, up-to-date information regarding their Deals.
          </li>
          <li>
            Must pass any background or verification checks required by Home Pro
            Deals.
          </li>
        </ul>
        <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
          Clients:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Must ensure that all payment information provided is accurate and
            valid.
          </li>
        </ul>
        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          3. PRO BUCKS PROGRAM
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          <span className="font-semibold">Pro Bucks</span> are platform credits
          earned through transactions and referrals. Pro Bucks cannot be
          exchanged for cash and are solely for use within the Home Pro Deals
          platform.
        </p>
        <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
          Earning Pro Bucks:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            <span className="font-semibold">Transaction Rewards:</span> Clients
            earn Pro Bucks as a percentage of their purchases on the platform.
          </li>
          <li>
            <span className="font-semibold">Referral Rewards:</span> Users
            (Clients or Providers) earn Pro Bucks by referring new Clients or
            Providers. A percentage of the referred Provider's earnings or
            Client's spending is credited as Pro Bucks.
          </li>
        </ul>
        <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
          Using Pro Bucks:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Pro Bucks can be applied to eligible Deals and services available on
            the platform.
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          4. DEAL LISTING AND TRANSACTIONS
        </h2>
        <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
          Providers:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Must ensure the accuracy of Deal descriptions, pricing, and terms.
          </li>
          <li>Are responsible for fulfilling Deals as advertised.</li>
          <li>
            Authorize Home Pro Deals to deduct transaction fees before payout.
          </li>
          <li>
            May request edits or updates to their profile or Deal listings
            through Home Pro Reps.
          </li>
          <li>
            Grant Home Pro Deals the right to audit their participation for
            compliance and quality assurance.
          </li>
          <li>
            Affirm that all data posted in their profiles is true and up to
            date. Providers are prohibited from posting work or jobs they did
            not complete. False advertising of skills or services may result in
            account suspension or termination.
          </li>
        </ul>
        <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
          Clients:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Must pay the full listed price for Deals, including applicable taxes
            or fees.
          </li>
          <li>
            Are responsible for coordinating directly with Providers to redeem
            Deals.
          </li>
          <li>
            Affirm that all data posted in their profiles is true and up to
            date.
          </li>
          <li>
            Acknowledge that Home Pro Deals is not responsible for service
            quality or delivery.
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          5. PAYMENTS, REFUNDS, AND DISPUTES
        </h2>
        <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
          Providers:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Payments are processed through Home Pro Deals' secure payment
            system.
          </li>
          <li>
            Refund Requests: Clients must request refunds directly from the
            Provider. Providers can approve or deny the request. If the Client
            disputes the Provider's decision, they may escalate the issue to
            Home Pro Deals.
          </li>
          <li>
            Home Pro Deals will mediate only disputes related to transactions,
            excluding issues of service quality or delivery.
          </li>
          <li>
            Unresolved disputes will be settled through binding arbitration,
            with both parties waiving their right to a jury trial.
          </li>
          <li>
            Providers are required to honor all valid refund requests or dispute
            resolutions determined by Home Pro Deals.
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          6. REPRESENTATIONS AND WARRANTIES
        </h2>
        <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
          Provider Warranties:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Providers affirm they have the legal authority and licenses to offer
            the services or goods listed.
          </li>
          <li>
            Providers ensure their Deals comply with applicable laws and do not
            infringe on any third-party rights.
          </li>
          <li>
            Providers agree to maintain a high standard of service and
            communication with Clients.
          </li>
          <li>
            Providers affirm that all posted data is truthful and accurate and
            that any failure to comply may result in removal from the platform.
          </li>
          <li>
            Providers are required to honor all valid refund requests or dispute
            resolutions determined by Home Pro Deals.
          </li>
        </ul>
        <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
          Client Warranties:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Clients affirm they will use the platform responsibly and for lawful
            purposes.
          </li>
          <li>
            Clients affirm that all posted data in their profiles is truthful
            and accurate.
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          7. TRACKING AND ANALYTICS
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Home Pro Deals may use tools such as tracking phone numbers or
          analytics to monitor platform performance and ensure proper crediting
          for transactions. Providers consent to the use of these tools to
          improve services and track business referred through the platform.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          8. GIFT CARD AND DEAL REDEMPTION
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Providers must ensure all Deals, including those purchased as gift
          cards, comply with applicable federal, state, and local laws.
          Providers are responsible for honoring gift card terms and ensuring
          their proper redemption by Clients.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          9. PROVIDER OBLIGATIONS
        </h2>
        <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
          Providers agree to:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Use best efforts to deliver high-quality goods or services as
            described in their Deals.
          </li>
          <li>
            Maintain accurate and up-to-date information on their profile and
            listings.
          </li>
          <li>
            Respond promptly to Client inquiries and schedule services as
            required.
          </li>
          <li>
            Notify Home Pro Deals immediately of any changes in their business
            operations that may affect their ability to fulfill Deals.
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          10. AUDITING AND QUALITY ASSURANCE
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Home Pro Deals reserves the right to audit Providers’ activities on
          the platform to ensure compliance with these Terms and Conditions.
          Audits may include test purchases or reviews conducted by Home Pro
          Deals representatives. Failure to comply may result in account
          suspension or termination.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          11. INDEMNIFICATION
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Providers and Clients agree to indemnify, defend, and hold harmless
          Home Pro Deals, its affiliates, officers, directors, employees, and
          agents from any claims, damages, losses, liabilities, costs, or
          expenses arising out of:
        </p>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>Breach of these Terms and Conditions.</li>
          <li>
            The provision or receipt of services or goods listed on the
            platform.
          </li>
          <li>Violation of applicable laws or third-party rights.</li>
          <li>
            Failure to comply with any tax or regulatory obligations associated
            with transactions conducted on the platform, including but not
            limited to the collection and remittance of sales, use, or other
            applicable taxes.
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          12. DISCLAIMER OF WARRANTIES
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Home Pro Deals provides the platform on an "as is" and "as available"
          basis. We make no guarantees regarding the quality, reliability, or
          outcomes of the services or goods offered by Providers. Home Pro Deals
          disclaims all warranties, express or implied, including
          merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          13. WAIVERS AND SEVERABILITY
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Failure by Home Pro Deals to enforce any provision of these Terms and
          Conditions does not constitute a waiver of that provision. If any part
          of these Terms is deemed invalid or unenforceable, the remaining
          provisions will remain in full force and effect.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          14. LIMITATION OF LIABILITY
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Home Pro Deals is not liable for:
        </p>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Direct, indirect, incidental, or consequential damages arising from
            transactions.
          </li>
          <li>Service interruptions or inability to access the platform.</li>
          <li>
            The quality or outcome of any services or goods provided by
            Providers.
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          15. PRIVACY POLICY
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Use of the platform is subject to our Privacy Policy, which details
          how we collect, use, and safeguard your data.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          16. MODIFICATIONS TO TERMS
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Home Pro Deals reserves the right to update these Terms and Conditions
          at any time. Updates will be communicated to all parties via formal
          notice. Continued use of the platform constitutes acknowledgment and
          acceptance of the revised terms. Parties are responsible for reviewing
          and complying with updates.
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          17. GOVERNING LAW AND DISPUTE RESOLUTION
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          These Terms and Conditions are governed by the laws of the State of
          Indiana. Disputes will be resolved through binding arbitration, per
          applicable rules, and both parties waive their right to a jury trial.
          Arbitration will be conducted in the jurisdiction of Indiana unless
          otherwise agreed upon.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          18. TAX COMPLIANCE
        </h2>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Providers are responsible for collecting and remitting any
            applicable taxes for their services.
          </li>
          <li>
            All users must comply with applicable legal requirements related to
            transactions.
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          19. PROHIBITED CONDUCT
        </h2>
        <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8">
          Users may not:
        </h3>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>Post inaccurate or deceptive information.</li>
          <li>Engage in fraudulent or harmful activity.</li>
          <li>Use the platform for unlawful purposes.</li>
          <li>
            Violate any state or federal regulations regarding service or
            product advertising.
          </li>
        </ul>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Violations may result in immediate account suspension or termination.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          20. ACCOUNT SECURITY
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Users must maintain the confidentiality of their account credentials.
          Home Pro Deals is not responsible for unauthorized access due to user
          negligence.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          21. PLATFORM AVAILABILITY
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          The platform may experience occasional downtime for updates or
          maintenance. Home Pro Deals is not responsible for any resulting
          inconvenience or loss.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">
          22. MARKETING AND PROMOTIONS
        </h2>
        <p className="text-[#535862] mt-6 sm:mt-8">
          Home Pro Deals is not liable for:
        </p>
        <ul className="custom-list ms-4 text-[#535862]">
          <li>
            Providers may use approved marketing tools to promote their Deals on
            the platform.
          </li>
          <li>
            All promotional content must comply with Home Pro Deals' guidelines
            and be subject to review and approval.
          </li>
        </ul>

        <p className="my-6 sm:my-8">
          For any inquiries or assistance, please contact us at{" "}
          <Link className="text-[#0F91D2]">info@HomeProDeals.com</Link>.
        </p>

        <form >
          <div className="my-3 hidden">
            <label
              htmlFor="userid"
              className="myblack block w-full font-medium"
            >
              User ID
            </label>
            <input
              type="text"
              id="userid"
              readOnly
              className="mt-1 w-full border px-3 rounded-lg py-3"
            />
          </div>

          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              id="terms"
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
            className="text-white mb-3 font-semibold px-3 py-3 bg-blue w-full mt-3 rounded-lg"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

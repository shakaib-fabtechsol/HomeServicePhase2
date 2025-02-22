import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import BasicInfo from "../../Components/Services.jsx/BasicInfo";
import PricingPackaging from "../../Components/Services.jsx/PricingPackaging";
import MediaUpload from "../../Components/Services.jsx/MediaUpload";
import ReviewPublish from "../../Components/Services.jsx/ReviewPublish";
import TabComponent from "../../Components/TabComponent";

function NewDeals() {
  useEffect(() => {
    document.title = "New Deal";
  }, []);
  const tabData = [
    { label: "Basic Info", content: <BasicInfo /> },
    { label: "Pricing & Packages", content: <PricingPackaging /> },
    { label: "Media Upload", content: <MediaUpload /> },
    { label: "Review & Publish", content: <ReviewPublish /> },
  ];

  return (
    <div>
      <div className="flex items-center">
        <Link to="/provider/services">
          <FaArrowLeft className="me-4 text-xl" />
        </Link>
        <h2 className="text-2xl font-semibold">Create New Deal</h2>
      </div>
      <p className="text-[#535862] mt-4 mb-5 ms-8">
        Create, manage, and organize your deals effortlessly.
      </p>
      <TabComponent tabs={tabData} />
    </div>
  );
}

export default NewDeals;

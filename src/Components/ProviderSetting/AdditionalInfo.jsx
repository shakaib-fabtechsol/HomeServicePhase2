import React from "react";
import SettingsPreview from "../MUI/SettingsPreview";
import PreviewVideo from "../MUI/PreviewVideo";

const AdditionalInfo = () => {
  const handleFileChange = (e, fieldName) => {
    const uploadedFile = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: uploadedFile,
    }));
  };

  return (
    <div>
      <form>
        <div>
          <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
            <p className="text-lg font-semibold text-[#181D27]">
              Additional Info
            </p>
            <p className="text-[#535862] text-sm">
              Upload optional additional info.
            </p>
          </div>
          <div className="py-8 border-b">
            <div className="grid md:grid-cols-3 gap-2 max-w-[1000px]">
              <div>
                <p className="text-sm font-semibold text-[#414651]">
                  Upload About Us Video
                </p>
                <p className="text-[#535862] text-sm">
                  Optional info which will be publicly displayed.
                </p>
              </div>
              <div className="md:col-span-2">
                <PreviewVideo
                  onFileSelect={handleFileChange}
                  fieldName="about_video"
                />
              </div>
            </div>
          </div>
          <div className="py-8 border-b">
            <div className="grid md:grid-cols-3 gap-2 max-w-[1000px]">
              <div>
                <p className="text-sm font-semibold text-[#414651]">
                  Upload Technician Photos
                </p>
                <p className="text-[#535862] text-sm">
                  Optional info which will be publicly displayed.
                </p>
              </div>
              <div className="md:col-span-2">
                <SettingsPreview
                  onFileSelect={handleFileChange}
                  fieldName="technician_photo"
                />
              </div>
            </div>
          </div>
          <div className="py-8 border-b">
            <div className="grid md:grid-cols-3 gap-2 max-w-[1000px]">
              <div>
                <p className="text-sm font-semibold text-[#414651]">
                  Upload Vehicle Photos
                </p>
                <p className="text-[#535862] text-sm">
                  Optional info which will be publicly displayed.
                </p>
              </div>
              <div className="md:col-span-2">
                <SettingsPreview
                  onFileSelect={handleFileChange}
                  fieldName="vehicle_photo"
                />
              </div>
            </div>
          </div>
          <div className="py-8 border-b">
            <div className="grid md:grid-cols-3 gap-2 max-w-[1000px]">
              <div>
                <p className="text-sm font-semibold text-[#414651]">
                  Upload Facility Photos
                </p>
                <p className="text-[#535862] text-sm">
                  Optional info which will be publicly displayed.
                </p>
              </div>
              <div className="md:col-span-2">
                <SettingsPreview
                  onFileSelect={handleFileChange}
                  fieldName="facility_photo"
                />
              </div>
            </div>
          </div>
          <div className="py-8 border-b">
            <div className="grid md:grid-cols-3 gap-2 max-w-[1000px]">
              <div>
                <p className="text-sm font-semibold text-[#414651]">
                  Upload Project Photos
                </p>
                <p className="text-[#535862] text-sm">
                  Optional info which will be publicly displayed.
                </p>
              </div>
              <div className="md:col-span-2">
                <SettingsPreview
                  onFileSelect={handleFileChange}
                  fieldName="project_photo"
                />
              </div>
            </div>
          </div>
          <div className="grid max-w-[550px] grid-cols-3 my-4 gap-2 ms-auto">
            <button className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white">
              Cancel
            </button>
            <button className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]">
              Save & Publish
            </button>
            <button className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdditionalInfo;

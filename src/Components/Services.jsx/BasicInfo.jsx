import React, { useState } from "react";

function BasicInfo() {
  const [formData, setFormData] = useState({
    service_title: "",
    residential: false,
    category: "",
    service_description: "",
    fine_print: "",
  });
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const Businesscategories = [
    "Plumbing",
    "Electrical",
    "HVAC / Heating & Cooling",
    "Landscaping",
    "Roofing",
    "Painting",
    "Moving",
    "Security",
    "Cleaning service",
    "Appliance Repair",
  ];

  const handleAddTag = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTags((prevTags) => [...prevTags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleFinePrintChange = (e) => {
    let value = e.target.value;

    // Ensure each new line starts with a bullet point
    let updatedValue = value
      .split("\n")
      .map((line) => (line.trim().startsWith("•") ? line : `• ${line}`))
      .join("\n");

    setFormData({ ...formData, fine_print: updatedValue });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-7 mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="Title"
                className="font-semibold text-sm text-[#181D27]"
              >
                Deal Title
              </label>
              <input
                type="text"
                id="Title"
                placeholder="Enter deal name"
                className="myinput mt-1"
                required
                value={formData.service_title}
                onChange={(e) =>
                  setFormData({ ...formData, service_title: e.target.value })
                }
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 mt-4">
            <p className="font-semibold text-sm text-[#181D27]">Service Type</p>
            <div className="flex mt-4">
              <div className="flex items-center gap-2 me-4">
                <input
                  type="checkbox"
                  id="Commercial"
                  name="Commercial"
                  className="peer"
                />
                <label
                  htmlFor="Commercial"
                  className="font-semibold text-sm text-[#5E6670] peer-checked:text-[#181D27] cursor-pointer"
                >
                  Commercial
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="Residential"
                  name="Residential"
                  checked={formData.residential}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      residential: e.target.checked,
                    })
                  }
                  className="me-2 peer"
                />
                <label
                  htmlFor="Residential"
                  className="font-semibold text-sm text-[#5E6670] peer-checked:text-[#181D27]"
                >
                  Residential
                </label>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="Category"
                className="font-semibold focus-none text-sm text-[#181D27]"
              >
                Service Category
              </label>
              <select
                id="Category"
                className="myselect mt-1 outline-none"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="" hidden>
                  Select a category
                </option>
                {Businesscategories.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="flex flex-col">
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="Tags"
                    className="font-semibold text-sm text-[#181D27]"
                  >
                    Search Tags
                  </label>
                  <div className="border rounded-lg p-2 myinput flex flex-wrap min-h-[40px] mt-1">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-[#E7F4FB] text-[#0F91D2] px-3 py-2 rounded-full me-2"
                      >
                        {tag}
                        <button
                          type="button"
                          className="ml-2 text-white bg-[#0F91D2] rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          onClick={() => handleRemoveTag(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      id="Tags"
                      placeholder="Enter keywords to match your deal with buyers. Not publicly visible"
                      className="outline-none flex-grow"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleAddTag}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="Description"
                className="font-semibold text-sm text-[#181D27]"
              >
                Service Description
              </label>
              <textarea
                id="Description"
                className="myinput mt-1 outline-none"
                placeholder="Describe your deal in detail, this is publicly visible"
                rows={10}
                required
                value={formData.service_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    service_description: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="col-span-12 mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="FinePrint"
                className="font-semibold text-sm text-[#181D27]"
              >
                Fine Print{" "}
                <span className="text-[13px] text-[#cdcdcd]">(Optional)</span>
              </label>
              <textarea
      id="FinePrint"
      className="myinput mt-1 outline-none"
      placeholder={`Add specific deliverables for this deal. For example: what is included & what is not included`}
      rows={10}
      value={formData.fine_print}
      onChange={handleFinePrintChange}
    />
            </div>
          </div>
        </div>
        <div className="md:max-w-[550px] w-full mt-4 ms-auto">
          <div className="grid sm:grid-cols-3 gap-3">
            <button
              type="reset"
              className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white"
              onClick={() =>
                setFormData({
                  service_title: "",
                  residential: false,
                  category: "",
                  service_description: "",
                  fine_print: "",
                })
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border rounded-lg py-[10px] w-full text-white font-semibold bg-[#0F91D2]"
            >
              Publish
            </button>
            <button
              type="submit"
              className={`border rounded-lg py-[10px] w-full text-white font-semibold bg-[#0F91D2] ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save & Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BasicInfo;

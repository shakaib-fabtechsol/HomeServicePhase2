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

  const Businesscategories = ["Category 1", "Category 2", "Category 3"]; // Example categories, replace with actual data

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-7 mt-4">
            <div className="flex flex-col">
              <label htmlFor="Title" className="font-semibold">
                Service Title
              </label>
              <input
                type="text"
                id="Title"
                placeholder="Enter service name"
                className="myinput"
                required
                value={formData.service_title}
                onChange={(e) =>
                  setFormData({ ...formData, service_title: e.target.value })
                }
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 mt-4">
            <p className="font-semibold">Service Type</p>
            <div className="flex mt-4">
              <label className="flex me-4">
                <input
                  type="checkbox"
                  id="Commercial"
                  name="Commercial"
                  className="me-2"
                />
                Commercial
              </label>
              <label className="flex">
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
                  className="me-2"
                />
                Residential
              </label>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 mt-4">
            <div className="flex flex-col">
              <label htmlFor="Category" className="font-semibold">
                Service Category
              </label>
              <select
                id="Category"
                className="myselect"
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

          <div className="col-span-12 lg:col-span-7 mt-4">
            <div className="flex flex-col">
              <div className="col-span-12 lg:col-span-7 mt-4">
                <div className="flex flex-col">
                  <label htmlFor="Tags" className="font-semibold">
                    Search Tags
                  </label>
                  <div className="border rounded-lg p-2 myinput flex flex-wrap min-h-[40px]">
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
                      placeholder="Enter tag and press Enter"
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
              <label htmlFor="Description" className="font-semibold">
                Service Description
              </label>
              <textarea
                id="Description"
                className="myinput"
                placeholder="Write here..."
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
              <label htmlFor="FinePrint" className="font-semibold">
                Fine Print{" "}
                <span className="text-[13px] text-[#cdcdcd]">(Optional)</span>
              </label>
              <textarea
                id="FinePrint"
                className="myinput"
                placeholder="Write here..."
                rows={10}
                value={formData.fine_print}
                onChange={(e) =>
                  setFormData({ ...formData, fine_print: e.target.value })
                }
              />
            </div>
          </div>

          <div className="col-span-12 mt-4 flex justify-end">
            <button
              type="reset"
              className="border border-gray-300 rounded-lg w-[150px] py-[10px] font-semibold bg-white me-4"
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
              className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BasicInfo;

import React, { useState, useRef, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { setUser } from "../../redux/reducers/authSlice";
import {
  LoadScript,
  GoogleMap,
  Marker,
  Circle,
  Autocomplete,
  // useAddBusinessLocationMutation
} from "@react-google-maps/api";

import { useAddBusinessLocationMutation } from "../../services/settings";

import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Loader from "../MUI/Loader";
const GOOGLE_API_KEY = "AIzaSyAu1gwHCSzLG9ACacQqLk-LG8oJMkarNF0";
const libraries = ["places"];
const ServiceArea = ({ handleTabChange }) => {
  const userData = useSelector((state) => state.auth.user);

  const [serviceType, setServiceType] = useState(
    userData?.businessProfile?.service_location_type || "location"
  );
  const [location, setLocation] = useState(
    userData?.businessProfile?.business_location || ""
  );
  const [serviceLocation, setServiceLocation] = useState(
    userData?.businessProfile?.service_location || ""
  );
  const [locations, setLocations] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBulk, setIsBulk] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [locationsList, setLocationsList] = useState([]);
  const [value2, setValue2] = useState(
    userData?.businessProfile?.location_miles || 10
  );
  const [mapUrl, setMapUrl] = useState("");
  const [lat, setLat] = useState(null);
  const dispatch = useDispatch();
  const [lng, setLng] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addBusinessLocation] = useAddBusinessLocationMutation();

  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const checkGoogle = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        clearInterval(checkGoogle);
        if (!inputRef.current) return;

        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          { types: ["geocode"] }
        );

        autocompleteRef.current.addListener("place_changed", onPlaceSelected);
      }
    }, 500);

    return () => clearInterval(checkGoogle);
  }, []);
  // parameter
  const onPlaceSelected = (locationType) => {
    console.log("locationType....", locationType);
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();

    if (!place || !place?.geometry) {
      console.error("No location found.");
      return;
    }

    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    const address = place.formatted_address;
    if (locationType === "location") {
      setLocation(address);
    } else {
      setServiceLocation(address);
    }
    setLat(latitude);
    setLng(longitude);
    setMapUrl(
      `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${latitude},${longitude}`
    );
  };
  function valueLabelFormat(value) {
    return `${value} Miles`;
  }

  function calculateValue(value) {
    return value;
  }

  const handleChange2 = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue2(newValue);
    }
  };

  const handleBulkChange = (e) => {
    setIsBulk(e.target.checked);
    setBulkText("");
    setLocations([]);
  };

  const handleBulkTextChange = (e) => {
    setBulkText(e.target.value);
  };

  const handleAddLocation = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();

      if (!locations.includes(inputValue.trim())) {
        const updatedLocations = [...locations, inputValue.trim()];
        setLocations(updatedLocations);
        setInputValue("");
      }
    }
  };

  const handleRemoveLocation = (index) => {
    const updatedList = locationsList.filter((_, i) => i !== index);
    setLocationsList(updatedList);
  };

  const handleAdd = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setLocationsList([...locationsList, inputValue.trim()]);
      setInputValue("");
    }
  };

  const submisstion = async () => {
    const payload = {
      business_location: location,
      radius: value2,
      service_location_type: serviceType,
      locations: locationsList,
      restrict_location: "",
      service_location: serviceLocation,
      location_miles: value2,
    };
    setIsLoading(true);
    const formData = new FormData();
    formData.append("user_id", userData.id);
    formData.append("business_location", payload.business_location);
    formData.append("radius", payload.radius);
    formData.append("service_location_type", payload.service_location_type);
    formData.append("locations", payload.locations);
    formData.append("restrict_location", payload.restrict_location);
    formData.append("service_location", payload.service_location);
    formData.append("location_miles", payload.location_miles);
    if (serviceType === "radius") {
      formData.append("service_radius", value2);
    }
    const response = await addBusinessLocation(formData);
    console.log("response....", response);
    if (response?.data) {
      setIsLoading(false);
      handleTabChange(2);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Service area updated successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={libraries}>
        <div>
          <div className="border-b border-[#E9EAEB] pb-5 items-center flex-wrap gap-4">
            <p className="text-lg font-semibold text-[#181D27]">Service Area</p>
            <p className="text-[#535862] text-sm">
              Choose service area for your deals.
            </p>
          </div>
          <div className="lg:max-w-[65%] xl:max-w-[45%]">
            <div className="flex flex-wrap gap-4 py-4 items-center mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="serviceType"
                  className="form-radio"
                  checked={serviceType === "location"}
                  onChange={() => setServiceType("location")}
                />
                <span className="ms-3">Service Locations</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="serviceType"
                  className="form-radio"
                  checked={serviceType === "radius"}
                  onChange={() => setServiceType("radius")}
                />
                <span className="ms-3">Service Radius</span>
              </label>
            </div>

            {serviceType === "location" && (
              <div className="ser-location">
                <div className="mb-6">
                  <label
                    htmlFor="bloc"
                    className="block text-sm font-medium mb-2"
                  >
                    Business Location
                  </label>
                  <div className="flex items-center border py-2 rounded-lg px-3 relative w-full">
                    <Autocomplete
                      className="w-full"
                      onLoad={(auto) => (autocompleteRef.current = auto)}
                      onPlaceChanged={() => onPlaceSelected("location")}
                    >
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter your service location..."
                        className="w-full py-2 px-3 focus-none pr-10"
                      />
                    </Autocomplete>
                    <FaPencilAlt
                      onClick={() => setLocation("")}
                      className="absolute right-3 text-gray-500 cursor-pointer hover:text-gray-700"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap justify-between">
                    <label
                      htmlFor="sloc"
                      className="block text-sm font-medium my-2"
                    >
                      Enter Service Locations
                    </label>
                    <div className="flex my-2 items-center">
                      <input
                        type="checkbox"
                        id="bulk"
                        className="me-2 focus-none focus:outline-none"
                        checked={isBulk}
                        onChange={handleBulkChange}
                      />
                      <label
                        htmlFor="bulk"
                        className="block text-sm font-semibold"
                      >
                        Add locations in bulk
                      </label>
                    </div>
                  </div>

                  {isBulk ? (
                    <div className="relative flex flex-col mb-2 border rounded-lg px-3 py-2">
                      <Autocomplete
                        className="w-full"
                        onPlaceChanged={() =>
                          onPlaceSelected("service_location")
                        }
                      >
                        <textarea
                          id="bulkLoc"
                          rows="4"
                          onKeyDown={handleAddLocation}
                          placeholder="Enter locations, one per line."
                          className="w-full bg-transparent outline-none pt-[40px] resize-none"
                          value={bulkText}
                          onChange={handleBulkTextChange}
                        ></textarea>
                      </Autocomplete>
                    </div>
                  ) : (
                    <div className="flex items-center border py-2 rounded-lg px-3 mb-2">
                      <Autocomplete
                        className="w-full"
                        onPlaceChanged={() =>
                          onPlaceSelected("service_location")
                        }
                      >
                        <input
                          type="text"
                          defaultValue={serviceLocation}
                          placeholder="Enter service location..."
                          className="w-full py-2 px-3 focus-none"
                        />
                      </Autocomplete>
                    </div>
                  )}

                  <p className="text-sm myblack text-end">
                    {locations.length} / 1000
                  </p>
                </div>
                <div className="mb-6 border rounded-lg px-3 text-sm font-medium flex items-center">
                  <label htmlFor="restrict">
                    <img src={location} alt="" className="max-w-20px me-2" />
                  </label>
                  <Autocomplete className="w-full">
                    <input
                      type="text"
                      id="restrict"
                      className="w-full focus-none rounded-lg px-3 py-4"
                      placeholder="Restrict locations within a country (optional)"
                      onChange={(e) => setInputValue(e.target.value)}
                      value={inputValue}
                      defaultValue={userData?.restrict_location || ""}
                      onKeyDown={handleAdd}
                    />
                  </Autocomplete>
                </div>
                {locationsList.length > 0 && (
                  <div className="border rounded-lg py-3 mb-6">
                    {locationsList.map((loc, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 flex items-center justify-between"
                      >
                        <p className="myblack">{loc}</p>
                        <Link
                          to="#"
                          onClick={() => handleRemoveLocation(index)}
                          className="text-red-500"
                        >
                          ×
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {serviceType === "radius" && (
              <div className="ser-radius">
                <div className="mb-6">
                  <label
                    htmlFor="bloc"
                    className="block text-sm font-medium mb-2"
                  >
                    Enter Service Locations
                  </label>
                  <div className="flex items-center border py-2 rounded-lg px-3">
                    <img src={location} alt="" className="max-w-20px me-2" />
                    <Autocomplete
                      onLoad={(auto) => (autocompleteRef.current = auto)}
                      onPlaceChanged={onPlaceSelected}
                      className="w-full"
                    >
                      <input
                        type="text"
                        value={serviceLocation}
                        onChange={(e) => setServiceLocation(e.target.value)}
                        placeholder="Enter your service location..."
                        className="w-full py-2 px-3 focus-none pr-10"
                      />
                    </Autocomplete>
                    <FaPencilAlt />
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="block text-sm font-medium mb-2">
                    Coverage from Service Location
                  </label>
                  <div className="flex justify-between">
                    <p className="text-sm">0 Miles</p>
                    <p className="text-sm">60 Miles</p>
                  </div>
                </div>
                <Box>
                  <Slider
                    value={value2}
                    min={0}
                    step={1}
                    max={60}
                    scale={calculateValue}
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    onChange={handleChange2}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                  />
                </Box>
              </div>
            )}

            {lat && lng && (
              <div className="map-container">
                <GoogleMap
                  center={{ lat, lng }}
                  zoom={10}
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                >
                  <Marker position={{ lat, lng }} />
                  <Circle
                    center={{ lat, lng }}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#FF0000",
                      fillOpacity: 0.35,
                      radius: value2 * 1609.34,
                    }}
                  />
                </GoogleMap>
              </div>
            )}
          </div>
          <div className="grid max-w-[550px] grid-cols-3 my-4 gap-2 ms-auto">
            <button className="border border-gray-300 rounded-lg py-[10px] w-full font-semibold bg-white">
              Cancel
            </button>
            <button
              onClick={submisstion}
              className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
            >
              Save & Publish
            </button>
            <button
              className="border rounded-lg p-3 w-full text-white font-semibold bg-[#0F91D2]"
              onClick={submisstion}
            >
              Save
            </button>
          </div>
        </div>
      </LoadScript>
    </div>
  );
};

export default ServiceArea;

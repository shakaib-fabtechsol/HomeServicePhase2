
import React, { useState, useRef, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Slider from "@mui/material/Slider";
import Swal from "sweetalert2";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyAu1gwHCSzLG9ACacQqLk-LG8oJMkarNF0";
const libraries = ["places", "marker"];

const ServiceArea = ({ handleTabChange }) => {
  const [serviceType, setServiceType] = useState("location");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [publishValue, setPublishValue] = useState(1);
  const [isBulk, setIsBulk] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [locationsList, setLocationsList] = useState([]);
  const [value2, setValue2] = useState(10);
  const [lat, setLat] = useState(31.5204);
  const [lng, setLng] = useState(74.3587);
  const [errorMessage, setErrorMessage] = useState(null);
  const [map, setMap] = useState(null);
  const [circle, setCircle] = useState(null);
  const [marker, setMarker] = useState(null);

  const mapRef = useRef(null);
  const businessAutoCompleteRef = useRef(null);
  const userid = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // Initialize map
  useEffect(() => {
    if (window.google?.maps && mapRef.current && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 10,
        mapId: "DEMO_MAP_ID",
      });
      setMap(newMap);
    }
  }, [window.google?.maps, mapRef.current]);

  // Update marker and circle when position changes
  useEffect(() => {
    if (!map || !window.google?.maps?.marker?.AdvancedMarkerElement) return;

    // Clear existing marker
    if (marker) {
      marker.map = null;
    }

    // Create new marker
    const newMarker = new window.google.maps.marker.AdvancedMarkerElement({
      position: { lat, lng },
      map,
      title: "Service Location",
    });
    setMarker(newMarker);

    return () => {
      if (newMarker) newMarker.map = null;
    };
  }, [map, lat, lng]);

  // Update circle when radius changes
  useEffect(() => {
    if (!map || serviceType !== "radius") return;

    // Clear existing circle
    if (circle) {
      circle.setMap(null);
    }

    // Create new circle
    const newCircle = new window.google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: { lat, lng },
      radius: value2 * 1609.34,
    });

    setCircle(newCircle);
    map.fitBounds(newCircle.getBounds());

    return () => {
      if (newCircle) newCircle.setMap(null);
    };
  }, [map, lat, lng, value2, serviceType]);
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
  const handleAdd = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setLocationsList([...locationsList, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleBulkChange = (e) => {
    setIsBulk(e.target.checked);
    setBulkText("");
    setLocations([]);
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    if (publishLoading) return;
    if (!userid?.id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Service ID is required!",
      });
      return;
    }

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No token found. Please log in.",
      });
      return;
    }

    setPublishLoading(true);

    try {
      const response = await axios.get(
        `https://marketplace.thefabulousshow.com/api/SettingPublish/${userid?.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("API Response:", response);

      if (response.data?.setting?.publish === 1) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text:
            response.data?.message ||
            "Service Location updated successfully.",
          confirmButtonColor: "#0F91D2",
        }).then(() => {
          handleTabChange(3);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text:
            response.data?.message ||
            "Failed to update the service location.",
          confirmButtonColor: "#D33",
        });
      }
    } catch (error) {
      console.error("Error updating deal:", error);
      const errorMsg =
        error.response?.data?.message ||
        "There was an error updating the deal.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMsg,
      });
    } finally {
      setPublishLoading(false);
    }
  };


  const handleAddLocation = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("Added locations:", bulkText.split("\n").filter((line) => line.trim() !== ""));
      setBulkText("");
    }
  };
  
  const handleBulkTextChange = (e) => {
    setBulkText(e.target.value);
  };
  const resetForm = () => {
    setServiceType("location");
    setLocation("");
    setLocations([]);
    setInputValue("");
    setIsBulk(false);
    setBulkText("");
    setLocationsList([]);
    setValue2(10);
    setLat(31.5204);
    setLng(74.3587);
  };

  const onPlaceSelected = () => {
    if (!businessAutoCompleteRef.current) return;
    const place = businessAutoCompleteRef.current.getPlace();
    if (!place?.geometry?.location) {
      toast.error("No location found.");
      return;
    }

    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    setLocation(place.formatted_address);
    setLat(latitude);
    setLng(longitude);
  };

  // Rest of your existing handlers (handleBulkTextChange, handleAddLocation, etc...)
  // [Keep all your existing form handlers unchanged]

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!token) {
      toast.error("No token found. Please log in.");
      setLoading(false);
      return;
    }
    try {
      let payload = {};
      if (serviceType === "location") {
        payload = {
          user_id: userid?.id,
          service_location: location,
          service_location_type: "location",
          business_location: location,
          restrict_location: locationsList,
        };
      } else if (serviceType === "radius") {
        payload = {
          user_id: userid?.id,
          service_location: location,
          service_location_type: "radius",
          location_miles: value2,
        };
      }
      const response = await axios.post(
        "https://marketplace.thefabulousshow.com/api/AddBusinessLocation",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response?.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text:
          response.data?.message ||
          "Service Location updated successfully.",
        confirmButtonColor: "#0F91D2",
      }).then(() => {
        handleTabChange(2);
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userid?.id) return;

    const fetchData = async () => {
      setLoading(true);
      if (!token) {
        toast.error("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://marketplace.thefabulousshow.com/api/UserDetails`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const BasicInfo = response?.data?.businessProfile[0];
        console.log(BasicInfo, "valuee");

        if (serviceType === "location") {
          setLocation(BasicInfo?.business_location || "");
        } else if (serviceType === "radius") {
          setLocation(BasicInfo?.business_location || "");
          setValue2(BasicInfo?.location_miles || 10);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch user details.");
        setLocationsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userid?.id, serviceType, token]);


  return (
    <div>

      {/* <LoadScript
        googleMapsApiKey={GOOGLE_API_KEY}
        libraries={libraries}
        version="beta"
        mapIds={["DEMO_MAP_ID"]}
        onLoad={() => console.log("Google Maps API Loaded")}
      > */}
        <form onSubmit={handleSubmit}>


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

          </div>
          {serviceType === "location" && (
            <div className="ser-location">
              <div className="mb-6">
                <label htmlFor="bloc" className="block text-sm font-medium mb-2">
                  Business Location
                </label>
                <div className="flex items-center border py-2 rounded-lg px-3 relative w-full">
                  <Autocomplete
                    onLoad={(auto) => (businessAutoCompleteRef.current = auto)}
                    onPlaceChanged={onPlaceSelected}
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
                    <label htmlFor="bulk" className="block text-sm font-semibold">
                      Add locations in bulk
                    </label>
                  </div>
                </div>

                {isBulk ? (
                  <div className="relative flex flex-col mb-2 border rounded-lg px-3 py-2">
                    <textarea
                      id="bulkLoc"
                      rows="4"
                      onKeyDown={handleAddLocation}
                      placeholder="Enter locations, one per line."
                      className="w-full bg-transparent outline-none pt-[40px] resize-none"
                      value={bulkText}
                      onChange={handleBulkTextChange}
                    ></textarea>
                  </div>
                ) : (
                  <div className="flex items-center border py-2 rounded-lg px-3 mb-2">
                    <input
                      type="text"
                      placeholder="Enter service location..."
                      className="w-full py-2 px-3 focus-none"
                    />
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
                <input
                  type="text"
                  id="restrict"
                  className="w-full focus-none rounded-lg px-3 py-4"
                  placeholder="Restrict locations within a country (optional)"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  onKeyDown={handleAdd}
                />
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


          {/* Service type selection and form inputs */}
          {/* [Keep your existing form inputs unchanged] */}
          {serviceType === "radius" && (
            <div className="ser-radius">
              <div className="mb-6">
                <label htmlFor="bloc" className="block text-sm font-medium mb-2">
                  Enter Service Locations
                </label>
                <div className="flex items-center border py-2 rounded-lg px-3">
                  <Autocomplete
                    onLoad={(auto) => (businessAutoCompleteRef.current = auto)}
                    onPlaceChanged={onPlaceSelected}
                  >
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter your service location..."
                      className="w-full py-2 px-3 focus-none pr-10"
                    />
                  </Autocomplete>
                  <FaPencilAlt />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
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
                  onChange={handleChange2}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                />
              </Box>
            </div>
          )}


          {(lat || serviceType === "location" || serviceType === "radius") && (
            <div className="map-container" style={{ marginTop: "20px" }}>
              <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
            </div>
          )}



          <div className="col-span-12 mt-4 flex justify-end gap-4">
            <button
              onClick={resetForm}
              className="border border-gray-300 rounded-lg w-[150px] py-[10px] font-semibold bg-white"
            >
              Cancel
            </button>
            <input
              type="text"
              id="Flatr"
              className="focus-none border hidden"
              readOnly
            />
            <input
              type="text"
              id="publish"
              value={publishValue}
              className="focus-none border hidden"
              readOnly
            />
            <button
              type="button"
              className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${publishLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={handlePublish}
              disabled={publishLoading}
            >
              {publishLoading ? "Publishing..." : "Publish & Next"}
            </button>

            <button
              type="submit"
              className={`border rounded-lg w-[150px] py-[10px] text-white font-semibold bg-[#0F91D2] ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Saving..." : " Save  & Next"}
            </button>
          </div>

        </form>
      {/* </LoadScript> */}
    </div>
  );
};

export default ServiceArea;
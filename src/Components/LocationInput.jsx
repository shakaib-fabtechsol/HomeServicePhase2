import React, { useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = "AIzaSyAu1gwHCSzLG9ACacQqLk-LG8oJMkarNF0"; // Replace with your actual key

const LocationInput = ({ label, placeholder, register   }) => {


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onPlaceSelected = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (place?.geometry) {
      console.log("Selected Place:", place);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocomplete.addListener("place_changed", () => onPlaceSelected(autocomplete));
        }}
      >
        <input
          className="border border-[#A2A1A833] rounded-[10px] p-3 w-full outline-none"
          type="text"
          {...register("location", { required: "Location is required" })}
          placeholder={placeholder || "Enter location..."}
        />
        
      </Autocomplete>
    </div>
  );
};

export default LocationInput;

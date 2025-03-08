import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";


const LocationInput = ({ label, placeholder, register }) => {




  const onPlaceSelected = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (place?.geometry) {
      console.log("Selected Place:", place);
    }
  };



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

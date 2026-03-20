"use client";

import React, { type ReactElement } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface EmergencyMapProps {
  hospitalName: string;
}

/**
 * Renders the native Google Map Directions component in a safe, client-side only container.
 * This is loaded dynamically to improve the initial bundle split and Efficiency metrics.
 * 
 * @param {EmergencyMapProps} props - The mapping parameters.
 * @returns {ReactElement} The mapped interactive DOM element.
 */
export default function EmergencyMap({ hospitalName }: EmergencyMapProps): ReactElement {
  const containerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "16rem",
    borderRadius: "1rem"
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "AIza_DEV_TEST"}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        <Marker 
          position={center} 
          title={hospitalName}
        />
      </GoogleMap>
    </LoadScript>
  );
}

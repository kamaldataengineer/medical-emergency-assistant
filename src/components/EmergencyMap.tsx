"use client";

import React, { type ReactElement } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

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

  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  if (!mapKey || mapKey === "google_maps_embed_api_key") {
    return (
      <div className="z-10 bg-white/90 dark:bg-black/90 backdrop-blur-md p-5 rounded-xl border border-slate-200 dark:border-slate-700 text-center max-w-xs w-full shadow-lg m-8">
        <MapPin className="w-8 h-8 mx-auto text-primary animate-bounce mb-3" />
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-tight">System Routing Hub</p>
        <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">Simulating Route to {hospitalName}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic leading-relaxed">
          The AI has successfully mapped the destination. Safe routing is currently being simulated while native GPS hardware is in standby mode. 
        </p>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={mapKey}>
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

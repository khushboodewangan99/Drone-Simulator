import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, Polyline, useLoadScript } from "@react-google-maps/api";

const Map = ({ coordinates, isPaused }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false); 
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAj1UBN6t7bHjm4xlymqHlabAERCbpFYDc", 
  });

  useEffect(() => {
    let interval;

    if (!isPaused && coordinates.length > 1) {
      setIsSimulationRunning(true); 
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < coordinates.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            return prevIndex;
          }
        });
      }, 1000); 
    } else {
      setIsSimulationRunning(false); 
    }

    return () => clearInterval(interval);
  }, [isPaused, coordinates]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      center={coordinates.length > 0 ? coordinates[0] : { lat: 20.5937, lng: 78.9629 }} 
      zoom={4}
      mapContainerStyle={{ height: "400px", width: "100%" }}
      ref={mapRef}
    >
      {coordinates.length > 0 && !isPaused && (
        <>
          <Marker position={coordinates[currentIndex]} label="Drone" ref={markerRef} />
          <Polyline path={coordinates} options={{ strokeColor: "#FF0000", strokeWeight: 2 }} />
        </>
      )}
    </GoogleMap>
  );
};

export default Map;

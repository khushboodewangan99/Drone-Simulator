import React, { useState } from "react";
import Map from "./components/Map";

const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [tempCoordinates, setTempCoordinates] = useState([]); 
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [simulationStarted, setSimulationStarted] = useState(false); 

  const handleAddCoordinates = () => {
    if (lat && lng) {
      setTempCoordinates([
        ...tempCoordinates,
        { lat: parseFloat(lat), lng: parseFloat(lng) },
      ]);
      setLat("");
      setLng("");
    } else {
      alert("Please enter valid latitude and longitude values!");
    }
  };

  const handleStartSimulation = () => {
    if (tempCoordinates.length > 0) {
      setCoordinates(tempCoordinates);
      setSimulationStarted(true);
      setIsPaused(false);
    } else {
      alert("Please add at least one coordinate to start the simulation!");
    }
  };

  const handlePauseSimulation = () => {
    if (simulationStarted) {
      setIsPaused(!isPaused); // Toggle pause/resume
    } else {
      alert("Simulation hasn't started yet!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Drone Simulator</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="number"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <button onClick={handleAddCoordinates}>Add Coordinate</button>
      </div>
      <div style={{ position: "relative", height: "400px" }}>
        <Map
          coordinates={simulationStarted ? coordinates : []} 
          isPaused={isPaused}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <button onClick={handleStartSimulation}>Start Simulation</button>
          <button onClick={handlePauseSimulation}>
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

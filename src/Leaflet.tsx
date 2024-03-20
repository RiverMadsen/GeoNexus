import React, { useEffect, useRef } from 'react';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles
const Leaflet: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current !== null) {
      const map = L.map(mapRef.current).setView([51.505, -0.09], 13); // Set initial view (latitude, longitude, zoom)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }
  }, []);

  return (
    <>
    <div ref={mapRef} style={{ width: '100vw', height: '100vh' }} /> // Set container size
    </>
    
  );
};

export default Leaflet;

import React, { useEffect, useRef } from 'react';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles

const Leaflet: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null); // Store the map instance

  useEffect(() => {
    if (mapRef.current !== null && mapInstance.current === null) { // Check if the map is not already initialized
      mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView([49, -114], 13);
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.opentopomap.org/#map">OpenTopoMap</a> contributors'
      }).addTo(mapInstance.current);
    }
    
    // Clean up function to avoid memory leaks and issues when the component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ height: '100vh', width: '100vw' }} />;
};

export default Leaflet;

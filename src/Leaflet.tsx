import React, { useEffect, useRef } from 'react';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles

interface LeafletProps {
  onMenuClick: (actor:string) => void;
}

const Leaflet: React.FC<LeafletProps> = ({ onMenuClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null); // Store the map instance
 
  useEffect(() => {
    console.log("Leaflet.tsx use effect");
    if (mapRef.current !== null && mapInstance.current === null) { // Check if the map is not already initialized
      mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView([49, -114], 13);
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.opentopomap.org/#map">OpenTopoMap</a> contributors'
      }).addTo(mapInstance.current);
    }

    // Add click event listener
    if (mapInstance.current !== null) {
      mapInstance.current.on('click', () => {
        onMenuClick("map");
      });
    }

    // Clean up function to avoid memory leaks and issues when the component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const openMenu = () => {
    console.log("click menu")
    onMenuClick("menu");
  }

  return (
    <div className="relative h-screen w-screen">
      <div ref={mapRef} className="absolute top-0 left-0 h-full w-full" />
      <button onClick={openMenu} className="absolute top-0 right-0 m-4 
      bg-transparent text-black p-2 rounded z-1000 outline-none focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" className="h-8 w-8 outline-none focus:outline-none">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
  // return <div ref={mapRef} style={{ height: '100vh', width: '100vw' }} />;
};

export default Leaflet;

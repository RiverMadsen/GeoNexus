import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles
import { drawColorTestArea } from './colorTestArea';
import { useSettings } from './store/SettingsContext';
import { MdGpsNotFixed } from "react-icons/md";


interface LeafletProps {
  onMenuClick: (actor: string) => void;
}

const Leaflet: React.FC<LeafletProps> = ({ onMenuClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null); // Store the map instance
  const { state } = useSettings();
  const [tileLayerLoaded, setTileLayerLoaded] = useState(false);

  useEffect(() => {
    console.log("Leaflet.tsx use effect");


    if (mapRef.current !== null && mapInstance.current === null) { // Check if the map is not already initialized

      mapInstance.current = L.map(mapRef.current, { zoomControl: false });
      if (mapInstance.current !== null) {
        mapInstance.current.on('load', () => {
          console.log("Map loaded");
          //debugger;
          //drawColorTestArea(L, mapInstance, state);
          //drawColorTestArea(L, mapInstance, state);
        });
      }
      mapInstance.current.setView([49, -114], 13);




      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.opentopomap.org/#map">OpenTopoMap</a> contributors'
      }).addTo(mapInstance.current).addEventListener('load', () => {
        if (tileLayerLoaded === false) {
          console.log("drawColorTestArea - Tile layer loaded");
          //drawColorTestArea(L, mapInstance, state);
          setTileLayerLoaded(true);
        }

      });
    }

    // Add click event listener
    if (mapInstance.current !== null) {
      mapInstance.current.on('click', () => {
        console.log("click map")
        //drawColorTestArea(L, mapInstance, state);
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
  }, [tileLayerLoaded]);

  useEffect(() => {
    //console.log("state changed")
    if (tileLayerLoaded) {
      console.log("drawColorTestArea - state changed");
      drawColorTestArea(L, mapInstance, state);
    }
    //test
    //drawColorTestArea(L, mapInstance,state);
    //console.log("Leaflet.tsx use effect 2");
  }, [state])

  const openMenu = () => {
    console.log("click menu")
    onMenuClick("menu");
  }

  let timeoutIds: number[] = [];
let marker: L.CircleMarker | null = null;
let requestPending: boolean = false;

const zoomToLocation = () => {
  // Clear existing timeouts
  timeoutIds.forEach(id => clearTimeout(id));
  timeoutIds = [];

  // Remove existing marker
  if (marker) {
    marker.remove();
    marker = null;
  }

  // Set requestPending to true
  requestPending = true;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      // If a new request has been made, ignore this one
      if (!requestPending) return;

      const { latitude, longitude } = position.coords;
      if (mapInstance.current) {
        const currentZoom = mapInstance.current.getZoom();
        mapInstance.current.flyTo([latitude, longitude], currentZoom);

        // Create a new marker and add it to the map
        marker = L.circleMarker([latitude, longitude], {
          color: 'green',
          fillColor: 'green',
          fillOpacity: 1,
          radius: 10
        });
        marker.addTo(mapInstance.current);

        // Change color to yellow after 1 minute
        timeoutIds.push(window.setTimeout(() => {
          if (marker) marker.setStyle({ color: 'yellow', fillColor: 'yellow' });
        }, 60000));

        // Change color to orange after 2 minutes
        timeoutIds.push(window.setTimeout(() => {
          if (marker) marker.setStyle({ color: 'orange', fillColor: 'orange' });
        }, 120000));

        // Change color to red after 3 minutes
        timeoutIds.push(window.setTimeout(() => {
          if (marker) marker.setStyle({ color: 'red', fillColor: 'red' });
        }, 180000));

        // Set requestPending to false
        requestPending = false;
      }
    }, (error: GeolocationPositionError) => {
      console.error('Error getting location', error);
    });
  } else {
    console.error('Geolocation not supported by this browser.');
  }
}

  // let timeoutIds: number[] = [];
  // let marker: L.CircleMarker | null = null;

  // const zoomToLocation = () => {
  //   // Clear existing timeouts
  //   timeoutIds.forEach(id => clearTimeout(id));
  //   timeoutIds = [];

  //   // Remove existing marker
  //   if (marker) {
  //     marker.remove();
  //     marker = null;
  //   }

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
  //       const { latitude, longitude } = position.coords;
  //       if (mapInstance.current) {
  //         const currentZoom = mapInstance.current.getZoom();
  //         mapInstance.current.flyTo([latitude, longitude], currentZoom);

  //         // Create a new marker and add it to the map
  //         marker = L.circleMarker([latitude, longitude], {
  //           color: 'green',
  //           fillColor: 'green',
  //           fillOpacity: 1,
  //           radius: 10
  //         });
  //         marker.addTo(mapInstance.current);

  //         // Change color to yellow after 1 minute
  //         timeoutIds.push(window.setTimeout(() => {
  //           if (marker) marker.setStyle({ color: 'yellow', fillColor: 'yellow' });
  //         }, 60000));

  //         // Change color to orange after 2 minutes
  //         timeoutIds.push(window.setTimeout(() => {
  //           if (marker) marker.setStyle({ color: 'orange', fillColor: 'orange' });
  //         }, 120000));

  //         // Change color to red after 3 minutes
  //         timeoutIds.push(window.setTimeout(() => {
  //           if (marker) marker.setStyle({ color: 'red', fillColor: 'red' });
  //         }, 180000));
  //       }
  //     }, (error: GeolocationPositionError) => {
  //       console.error('Error getting location', error);
  //     });
  //   } else {
  //     console.error('Geolocation not supported by this browser.');
  //   }
  // }

  return (
    <div className="relative h-screen w-screen">
      <div ref={mapRef} className="absolute top-0 left-0 h-full w-full" />
      <button onClick={openMenu} className="absolute top-0 right-0 m-4 
      bg-transparent text-black p-2 rounded z-1000 outline-none focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" className="h-8 w-8 outline-none focus:outline-none">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button onClick={zoomToLocation} style={{ color: 'var(--nex-black)' }} className="absolute top-0 left-0 m-4 text-4xl 
      bg-transparent text-black p-2 rounded z-1000 outline-none focus:outline-none">
        <MdGpsNotFixed />
      </button>
    </div>
  );

};


// GEEK - Memoized the component to avoid re-rendering
export default React.memo(Leaflet);

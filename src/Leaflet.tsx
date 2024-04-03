import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles
import { drawColorTestArea } from './colorTestArea';
import { useSettings } from './store/SettingsContext';
//import { MdOutlineMenu } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//import { Icon } from 'leaflet';
//import currentPositionIco from './assets/position.png';
//import MarkerClusterGroup from 'react-leaflet-cluster';
import { LocationButton } from './LocationButton';
import { MenuButton } from './MenuButton';

interface LeafletProps {
  onMenuClick: (actor: string) => void;
}

const Leaflet: React.FC<LeafletProps> = ({ onMenuClick }) => {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09, accuracy: 0});
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null); // Store the map instance
  const { state } = useSettings();
  const [tileLayerLoaded, setTileLayerLoaded] = useState(false);
  // const currentPositionIcon = new Icon({
  //   iconUrl: currentPositionIco,
  //   iconSize: [32, 32],
  //   color: 'blue',
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   shadowSize: [41, 41]
  // });
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



  // let timeoutIds: number[] = [];
  // let marker: L.CircleMarker | null = null;
  // let requestPending: boolean = false;

  // const zoomToLocation = () => {
  //   // Clear existing timeouts
  //   timeoutIds.forEach(id => clearTimeout(id));
  //   timeoutIds = [];

  //   // Remove existing marker
  //   if (marker !== null) {
  //     marker.remove();
  //     marker = null;
  //   }

  //   // Set requestPending to true
  //   requestPending = true;

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
  //       // If a new request has been made, ignore this one
  //       if (!requestPending) return;

  //       const { latitude, longitude } = position.coords;
  //       if (mapInstance.current) {
  //         const currentZoom = mapInstance.current.getZoom();
  //         mapInstance.current.flyTo([latitude, longitude], currentZoom);

  //         // Create a new marker and add it to the map
  //         marker = L.circleMarker([latitude, longitude], {
  //           color: 'black',
  //           fillColor: 'blue',
  //           fillOpacity: 1,
  //           radius: 10
  //         });
  //         marker.addTo(mapInstance.current);

  //         // Change color to green after 30 seconds
  //         timeoutIds.push(window.setTimeout(() => {
  //           if (marker) marker.setStyle({ color: 'black', fillColor: 'green' });
  //         }, 30000));

  //         // Change color to yellow after 1 minute
  //         timeoutIds.push(window.setTimeout(() => {
  //           if (marker) marker.setStyle({ color: 'black', fillColor: 'yellow' });
  //         }, 60000));

  //         // Change color to orange after 2 minutes
  //         timeoutIds.push(window.setTimeout(() => {
  //           if (marker) marker.setStyle({ color: 'black', fillColor: 'orange' });
  //         }, 120000));

  //         // Change color to red after 3 minutes
  //         timeoutIds.push(window.setTimeout(() => {
  //           if (marker) marker.setStyle({ color: 'black', fillColor: 'red' });
  //         }, 180000));

  //         // Set requestPending to false
  //         requestPending = false;
  //       }
  //     }, (error: GeolocationPositionError) => {
  //       console.error('Error getting location', error);
  //     });
  //   } else {
  //     console.error('Geolocation not supported by this browser.');
  //   }
  // }

  const handlePositionFound = (e: L.LocationEvent) => {
    //debugger;
    const radius = e.accuracy;
    const currentPosition = e.latlng;
    setPosition(() => {
      return {
        lat: currentPosition.lat,
        lng: currentPosition.lng,
        accuracy: radius
      }
    })
  }

  return (
    <>
      <MapContainer center={[49, -114]} zoom={13} style={{ height: '100vh', width: '100vw' }} zoomControl={false} >
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.opentopomap.org/#map">OpenTopoMap</a> contributors' />
        <Marker position={[49, -114]} >
          <Popup><h2>Hello</h2></Popup>
        </Marker>
        {/* Current Position */}
        <Marker position={[position.lat, position.lng]} >
          <Popup><div><h2>{position.lat.toString()},{position.lng.toString()}</h2><p>Accuracy: {Math.round(position.accuracy)}</p></div> </Popup>
        </Marker>
        <LocationButton onPositionFound={handlePositionFound} />
        <MenuButton onClick={openMenu} />
      </MapContainer>
    </>
  );

};


// GEEK - Memoized the component to avoid re-rendering
export default React.memo(Leaflet);

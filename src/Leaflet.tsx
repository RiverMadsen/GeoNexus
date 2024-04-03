import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles
import { drawColorTestArea } from './colorTestArea';
import { useSettings } from './store/SettingsContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import blueIcon from './assets/map-icons/blue.png';
import greenIcon from './assets/map-icons/green.png';
import yellowIcon from './assets/map-icons/yellow.png';
import orangeIcon from './assets/map-icons/orange.png';
import redIcon from './assets/map-icons/red.png';
//import currentPositionIco6 from './assets/map-icons/red.png';
//import currentPositionIco7 from './assets/map-icons/red.png';
//import MarkerClusterGroup from 'react-leaflet-cluster';
import { LocationButton } from './LocationButton';
import { MenuButton } from './MenuButton';

interface LeafletProps {
  onMenuClick: (actor: string) => void;
}

const Leaflet: React.FC<LeafletProps> = ({ onMenuClick }) => {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09, accuracy: 0, time: 'unset time' });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null); // Store the map instance
  const { state } = useSettings();
  const [tileLayerLoaded, setTileLayerLoaded] = useState(false);
  let timeAtLastPositionAcquire = new Date().getTime();
  const [currentPositionIcon, setCurrentPositionIcon] = useState<Icon>(new Icon({
    iconUrl: blueIcon,
    iconSize: [32, 32],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }));

  useEffect(() => {
    console.log("Leaflet.tsx use effect");


    if (mapRef.current !== null && mapInstance.current === null) { // Check if the map is not already initialized

      mapInstance.current = L.map(mapRef.current, { zoomControl: false });
      if (mapInstance.current !== null) {
        mapInstance.current.on('load', () => {
          console.log("Map loaded");
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
  }, [state])

  const constructNextCurrentPositionIcon = ( ) => {
    let newURL = blueIcon;
    const elapsedTime = new Date().getTime() - timeAtLastPositionAcquire;
    if (elapsedTime > 80000) {
      newURL = redIcon;
    } else if (elapsedTime > 60000) {
      newURL = orangeIcon;
    } else if (elapsedTime > 40000) {
      newURL = yellowIcon;
    } else if (elapsedTime > 20000) {
      newURL = greenIcon;
    }
    //console.log("newURL: " + newURL)
    return new Icon({
      iconUrl: newURL,
      iconSize: [32, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
  const openMenu = () => {
    console.log("click menu")
    onMenuClick("menu");
  }

  let timeoutIds: number[] = [];
  const handlePositionFound = (e: L.LocationEvent) => {

    const radius = e.accuracy;
    const currentPosition = e.latlng;
    timeAtLastPositionAcquire = new Date().getTime();
    setPosition(() => {
      if(timeoutIds.length === 0){
        timeoutIds.push(window.setInterval(() => {
          console.log("interval triggered")
          let nextIcon = constructNextCurrentPositionIcon()
          if(nextIcon.options.iconUrl === redIcon){
            window.clearInterval(timeoutIds[0]);
            console.log("interval cleared")
          }
          setCurrentPositionIcon(new Icon(nextIcon.options));
        }, 2000));
      }

      return {
        lat: currentPosition.lat,
        lng: currentPosition.lng,
        accuracy: radius,
        time: new Date(e.timestamp).toLocaleString()
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
        <Marker position={[position.lat, position.lng]} icon={currentPositionIcon} >
          <Popup><div><h3>{position.lat.toString()},{position.lng.toString()}</h3><p>TIME: {position.time}</p><p>ACCURACY: {Math.round(position.accuracy)}</p></div> </Popup>
        </Marker>
        <LocationButton onPositionFound={handlePositionFound} />
        <MenuButton onClick={openMenu} />
      </MapContainer>
    </>
  );

};


// GEEK - Memoized the component to avoid re-rendering
export default React.memo(Leaflet);

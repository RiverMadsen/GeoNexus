import { useMap } from 'react-leaflet';
import { MdGpsNotFixed } from "react-icons/md";
import 'leaflet/dist/leaflet.css';

export const LocationButton = ({ onPositionFound }: { onPositionFound: (e: L.LocationEvent) => void }) => {
  const map = useMap();

  const handleClick = () => {

    //onClick();
    map.locate({ setView: false }).on("locationfound", function (e) {
        //Zoom to the location but keep zoom level the same.
        map.flyTo([e.latlng.lat, e.latlng.lng], map.getZoom());
        onPositionFound(e);
    });
  };

  return (
    <button className='text-4xl ' style={{color:'black', position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}  onClick={handleClick}>
      <MdGpsNotFixed />
    </button>
  );
};
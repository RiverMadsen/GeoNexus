import { useMap } from 'react-leaflet';
import { MdGpsNotFixed } from "react-icons/md";
export const LocationButton = ({ onPositionFound }: { onPositionFound: (e: L.LocationEvent) => void }) => {
  const map = useMap();

  const handleClick = () => {

    //onClick();
    map.locate({ setView: true }).on("locationfound", function (e) {
        onPositionFound(e);
    });
  };

  return (
    <button className='text-4xl ' style={{color:'black', position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}  onClick={handleClick}>
      <MdGpsNotFixed />
    </button>
  );
};
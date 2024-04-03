import { MdOutlineMenu } from "react-icons/md";

import { useMap } from 'react-leaflet';

export const MenuButton = ({ onClick }: { onClick: () => void }) => {
  const map = useMap();

  const handleClick = () => {
    onClick();
  };

  return (
    <button className='text-4xl ' style={{color:'black', position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}  onClick={handleClick}>
      <MdOutlineMenu />
    </button>
  );
};
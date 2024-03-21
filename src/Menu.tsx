// import React from 'react';
import { FaDrawPolygon } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { BsRecordCircle } from "react-icons/bs";
import { LuMountainSnow } from "react-icons/lu";
import { ImCompass } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHelp } from "react-icons/md";
import { LuGlasses } from "react-icons/lu";
import { FiShare2 } from "react-icons/fi";
import { TiFolderOpen } from "react-icons/ti";
import { BsPinMapFill } from "react-icons/bs";

interface MenuProps {
    onMenuClose: () => void;
}
const menuItems = [
    { id: 0, name: "Open a Route", icon: <TiFolderOpen />, color:"nex-red"},
    { id: 1, name: "Take Area Offline", icon: <FaDrawPolygon />, color:"nex-orange"},
    { id: 2, name: "Sketch a Route" , icon: <BsPencil />, color:"nex-yellow"},
    { id: 3, name: "Record a Route" , icon: <BsRecordCircle />, color:"nex-green"},
    { id: 4, name: "Create Waypoint" , icon: <BsPinMapFill />, color:"nex-blue"},
    { id: 5, name: "View Elevation Profile" , icon: <LuMountainSnow />, color:"nex-purple"},
    { id: 6, name: "Navigate to Route" , icon: <ImCompass />, color:"nex-red"},
    { id: 7, name: "Share Route" , icon: <FiShare2 />, color:"nex-orange"},
    { id: 8, name: "Settings" , icon: <IoSettingsOutline />, color:"nex-green"},
    { id: 9, name: "Help" , icon: <MdOutlineHelp />, color:"nex-blue"},
    { id: 10, name: "Geek Zone" , icon: <LuGlasses />, color:"nex-purple"},

]
const Menu: React.FC<MenuProps> = ({ onMenuClose }) => {
    return (
        <>
            <div>
                <div className="text-nex-red w-1 h-1">test</div>
                <div className="text-nex-orange w-1 h-1">test</div>
                <div className="text-nex-yellow w-1 h-1">test</div>
                <div className="text-nex-green w-1 h-1">test</div>
                <div className="text-nex-blue w-1 h-1">test</div>
                <div className="text-nex-purple w-1 h-1">test</div>
            </div>
            <div className='font-sans absolute  z-1000 py-6 px-4 h-screen w-10/12 md:w-2/6 bg-gradient-to-r from-black via-black/90 to-black/70'>
                <h2 className=' text-5xl'><span className='px-1 bg-nex-blue rounded-lg text-black'>Geo</span><span className='text-nex-green ml-1'>Nexus</span></h2>
                <h4 className='mt-1 italic text-sm text-nex-dark-white'>Tech Meets Adventure</h4>
                <div className="menuClose">
                    <button className="hover:text-transparent absolute top-0 right-0 m-4 p-1 bg-transparent" onClick={onMenuClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-nex-red border-2 rounded-md border-nex-yellow">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav  className="mt-10">
                    <ul>
                        {
                            menuItems.map((item) => {
                                return (
                                    <li key={item.id} className="border-b-2 py-4 border-nex-dark-gray flex items-center ">
                                        <div className={`text-${item.color} mr-2 text-2xl`}>{item.icon}</div>
                                        <a className='text-nex-dark-white font-normal  ' >{item.name}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>

        </>

    );
};

export default Menu;
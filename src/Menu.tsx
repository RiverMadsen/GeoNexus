// import React from 'react';
import { FaDrawPolygon } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
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
import { useContext, useState } from "react";
import { MenuContext } from "./store/MenuContext";
import { AiOutlineLogin } from "react-icons/ai";
import { ReactNode } from 'react';

interface MenuProps {
    onMenuClose: () => void;
}
interface MenuItem {
    id: number;
    name: string;
    icon: ReactNode;
    color: string;
    component?: string;
    children?: MenuItem[];
}
const defaultMenuItems: MenuItem[] = [
    { id: 0, name: "Login", icon: <AiOutlineLogin />, color: "nex-red", component: "Login" },
    { id: 1, name: "Open a Route", icon: <TiFolderOpen />, color: "nex-orange", component: "OpenRoute" },
    { id: 2, name: "Take Area Offline", icon: <FaDrawPolygon />, color: "nex-yellow", component: "TakeAreaOffline" },
    { id: 3, name: "Sketch a Route", icon: <BsPencil />, color: "nex-green", component: "SketchRoute" },
    { id: 4, name: "Record a Route", icon: <BsRecordCircle />, color: "nex-blue", component: "RecordRoute" },
    { id: 5, name: "Create Waypoint", icon: <BsPinMapFill />, color: "nex-purple", component: "CreateWaypoint" },
    { id: 6, name: "View Elevation Profile", icon: <LuMountainSnow />, color: "nex-red", component: "ViewElevationProfile" },
    { id: 7, name: "Navigate to Route", icon: <ImCompass />, color: "nex-orange", component: "NavigateToRoute" },
    { id: 8, name: "Share Route", icon: <FiShare2 />, color: "nex-yellow", component: "ShareRoute" },
    { id: 9, name: "Settings", icon: <IoSettingsOutline />, color: "nex-green", component: "Settings" },
    { id: 10, name: "Help", icon: <MdOutlineHelp />, color: "nex-blue", component: "Help" },
    { id: 11, name: "Geek Zone...", icon: <LuGlasses />, color: "nex-purple", component: "GeekZone", children: [
            {
                id: 12, name: "React...", icon:  <LuGlasses />, color: "nex-red", children: [
                    { id: 25, name: "Custom Hooks", icon:  <LuGlasses />, color: "nex-red", component: "OpenRoute" },
                    { id: 26, name: "Context API", icon:  <LuGlasses />, color: "nex-orange", component: "TakeAreaOffline" },
                    { id: 27, name: "Redux-like State Managment", icon: <LuGlasses />, color: "nex-yellow", component: "SketchRoute" },
                ]
            },
            { id: 13, name: "Progressive Web Apps", icon:  <LuGlasses />, color: "nex-orange", component: "OpenRoute" },
            { id: 14, name: "Firebase", icon:  <LuGlasses />, color: "nex-yellow", component: "TakeAreaOffline" },
            { id: 15, name: "Leaflet", icon:  <LuGlasses />, color: "nex-green", component: "SketchRoute" },
            { id: 16, name: "Next JS", icon: <LuGlasses />, color: "nex-blue", component: "SketchRoute" },
            { id: 17, name: "Tailwind CSS", icon: <LuGlasses />, color: "nex-purple", component: "SketchRoute" },
            { id: 18, name: "Indexed DB", icon:  <LuGlasses />, color: "nex-red", component: "SketchRoute" },
            { id: 19, name: "Algorithms...", icon:  <LuGlasses />, color: "nex-orange", component: "SketchRoute" },
            { id: 20, name: "UI Theory anc Colors", icon:  <LuGlasses />, color: "nex-yellow", component: "SketchRoute" },
            { id: 21, name: "TypeScript", icon: <LuGlasses />, color: "nex-green", component: "SketchRoute" },
            { id: 22, name: "Vite", icon:  <LuGlasses />, color: "nex-blue", component: "SketchRoute" },
            { id: 23, name: "Vercel", icon: <LuGlasses />, color: "nex-purple", component: "SketchRoute" },
            { id: 24, name: "GitHub", icon:  <LuGlasses />, color: "nex-red", component: "SketchRoute" },

        ]
    }];


const Menu: React.FC<MenuProps> = ({ onMenuClose }) => {
    const { setActiveMenuItem } = useContext(MenuContext);
    const [menuItems, setMenuItems] = useState(defaultMenuItems);
    const [prevMenus, setPrevMenus] = useState<MenuItem[][]>([]);
    const [childMenuHeader, setChildMenuHeader] = useState<string>("");

    const handleMenuItemClick = (item: MenuItem) => {
        if (item.children) {
            setPrevMenus(prev => [...prev, menuItems]);
            setChildMenuHeader(item.name);
            setMenuItems(item.children);
            return;
        }
        if (item.component) {
            setActiveMenuItem(item.component);
        }
        onMenuClose();
    }
    const handleBackClick = () => {
        if (prevMenus.length > 0) {
            const lastMenu = prevMenus[prevMenus.length - 1];
            setMenuItems(lastMenu);
            setPrevMenus(prev => prev.slice(0, -1));
        }
    }
    return (
        <>
            {/* Hidden div to load the colors */}
            <div style={{ display: 'none' }}>
                <div className="text-nex-red w-1 h-1"> </div>
                <div className="text-nex-orange w-1 h-1"> </div>
                <div className="text-nex-yellow w-1 h-1"> </div>
                <div className="text-nex-green w-1 h-1"> </div>
                <div className="text-nex-blue w-1 h-1"> </div>
                <div className="text-nex-purple w-1 h-1"> </div>
            </div>
            <div className='font-sans absolute  overflow-y-scroll z-1002 py-6 px-4  h-screen w-10/12 md:w-2/6 border-r-2 sm:border-nex-blue md:border-none bg-gradient-to-r from-black via-black/90 to-nex-dark-gray/70'>
                <h2 className=' text-5xl'><span className='px-1 bg-nex-blue rounded-lg text-black'>Geo</span><span className='text-nex-green ml-1'>Nexus</span></h2>
                <h4 className='mt-1 italic text-[.6rem] text-nex-dark-white uppercase' >Adventure Begins Where the Trail Ends</h4>
                <div className="menuClose">
                    <button className="hover:text-transparent absolute top-0 right-0 m-4 p-1 bg-transparent" onClick={onMenuClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-nex-yellow rounded-md">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {prevMenus.length > 0 &&
                        <div className="mt-6 text-lg">
                            <button onClick={handleBackClick}> <IoArrowBackSharp />BACK</button>
                            <div className="mt-6 text-nex-red uppercase text-xl">
                                <h3 className="text-center border-nex-blue border-b-2">{childMenuHeader}</h3>
                            </div>
                        </div>
                    }
                </div>
                <nav className="mt-10 pb-20">
                    <ul>
                        {
                            menuItems.map((item) => {
                                return (
                                    <li key={item.id} className="border-b-2 py-4 border-nex-dark-gray flex items-center cursor-pointer" onClick={() => handleMenuItemClick(item)}>
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
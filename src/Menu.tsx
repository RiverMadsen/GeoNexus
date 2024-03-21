// import React from 'react';
import styles from './Menu.module.css';

interface MenuProps {
    onMenuClose: () => void;
}
const menuItems = [
    { id: 0, name: "Take Area Offline" },
    { id: 1, name: "Draw a Route" },
    { id: 2, name: "Record a Route" },
    { id: 3, name: "View Elevation Profile" },
    { id: 4, name: "Navigate to Route" },
    { id: 5, name: "Settings" },
    { id: 6, name: "Help" },
    { id: 7, name: "Geek Zone" },

]
const Menu: React.FC<MenuProps> = ({ onMenuClose }) => {
    return (
        <>

            <div className='absolute  z-1000 py-6 px-2 h-screen w-10/12 md:w-2/6 bg-gradient-to-r from-black via-black/90 to-black/70'>
                <h2 className=' text-5xl'><span className='bg-cyan-500'>Geo</span><span className='text-green-500'>Nexus</span></h2>
                <h4 className='mt-2 italic text-sm text-yellow-300'>The intersection of Tech and Adventure!</h4>
                <div className="menuClose">
                    <button className="hover:text-transparent absolute top-0 right-0 m-4 p-1 bg-transparent" onClick={onMenuClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-yellow-300">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav  className="mt-10">
                    <ul>
                        {
                            menuItems.map((item) => {
                                return (
                                    <li key={item.id} className="border-b-2 py-4">
                                        <a className={styles.menuItemText} >{item.name}</a>
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
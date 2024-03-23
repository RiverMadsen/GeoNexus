import './App.css'
import { useContext } from 'react';
import { MenuContext } from './store/MenuContext';
import Settings from './Settings'; // Import the 'Settings' component

const SCREEN_HEIGHT = window.innerHeight;
const SCREEN_WIDTH = window.innerWidth;


interface MainContentProps {
    requestedPosition: {x: number, y: number},
}
const MainContent: React.FC<MainContentProps> = ({requestedPosition }) => {
    const {activeMenuItem}  = useContext(MenuContext);

    return (
        <>
            <div style={{top: `${requestedPosition.y}px`, opacity:`${(requestedPosition.x / SCREEN_WIDTH)+.05}`, height: `${SCREEN_HEIGHT - requestedPosition.y}px`}} className={`w-full h-1/2 absolute bottom-0 p-4  border-t-2 border-nex-blue bg-black z-1000`}>
                {activeMenuItem === 'LOADING...' && <h1 className='text-nex-green'>LOADING...</h1>}
                {activeMenuItem === 'Settings' && <Settings />}
            </div>
        </>
    )
}

export default MainContent

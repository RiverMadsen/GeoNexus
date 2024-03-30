import './App.css'
import { useContext } from 'react';
import { MenuContext } from './store/MenuContext';
import Settings from './Settings'; // Import the 'Settings' component
import OpenRoute from './OpenRoute';
import CreateWaypoint from './CreateWaypoint';
import TakeAreaOffline from './TakeAreaOffline';
import SketchRoute from './SketchRoute';
import RecordRoute from './RecordRoute';
import ViewElevationProfile from './ViewElevationProfile';
import GeekZone from './GeekZone';
import Help from './Help';
import NavigateToRoute from './NavigateToRoute';
import ShareRoute from './ShareRoute';
const SCREEN_HEIGHT = window.innerHeight;
const SCREEN_WIDTH = window.innerWidth;


interface MainContentProps {
    requestedPosition: {x: number, y: number},
}
const MainContent: React.FC<MainContentProps> = ({requestedPosition }) => {
    const {activeMenuItem}  = useContext(MenuContext);

    return (
        <>
            <div style={{top: `${requestedPosition.y}px`,  opacity:`${(requestedPosition.x / SCREEN_WIDTH)+.05}`, height: `${SCREEN_HEIGHT - requestedPosition.y}px`}} className={`w-full h-1/2 absolute bottom-0 p-4 overflow-y-scroll border-t-2 border-nex-blue bg-black z-1000`}>
                {activeMenuItem === 'LOADING...' && <h1 className='text-nex-green'>LOADING...</h1>}
                {activeMenuItem === 'Settings' && <Settings />}
                {activeMenuItem === 'OpenRoute' && <OpenRoute />}
                {activeMenuItem === 'TakeAreaOffline' && <TakeAreaOffline />}
                {activeMenuItem === 'SketchRoute' && <SketchRoute />}
                {activeMenuItem === 'RecordRoute' && <RecordRoute />}
                {activeMenuItem === 'CreateWaypoint' && <CreateWaypoint />}
                {activeMenuItem === 'ViewElevationProfile' && <ViewElevationProfile />}
                {activeMenuItem === 'NavigateToRoute' && <NavigateToRoute />}
                {activeMenuItem === 'ShareRoute' && <ShareRoute />}
                {activeMenuItem === 'Help' && <Help  />}
                {activeMenuItem === 'GeekZone' && <GeekZone />}
            </div>
        </>
    )
}

export default MainContent

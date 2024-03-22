import { useState } from 'react'
import './App.css'

const SCREEN_HEIGHT = window.innerHeight;
const SCREEN_WIDTH = window.innerWidth;
interface MainContentProps {
    requestedPosition: {x: number, y: number},
}
const MainContent: React.FC<MainContentProps> = ({requestedPosition }) => {

    return (
        <>
            <div style={{top: `${requestedPosition.y}px`, opacity:`${(requestedPosition.x / SCREEN_WIDTH)+.05}`, height: `${SCREEN_HEIGHT - requestedPosition.y}px`}} className={`w-full h-1/2 absolute bottom-0 p-4  border-t-2 border-nex-blue bg-black z-1000`}>
                
                MAIN CONTENT 
            </div>
        </>
    )
}

export default MainContent

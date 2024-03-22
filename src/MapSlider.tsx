import { useState, useEffect } from 'react'
import './App.css'

interface MapSliderProps {
    onSlide: (newX: number, newY: number) => void;
    onClick: () => void;
}
const MapSlider: React.FC<MapSliderProps> = ({ onSlide, onClick }) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [sliderPosition, setSliderPosition] = useState({x: 0, y: 0});
    const SCREEN_HEIGHT = window.innerHeight;
    const SCREEN_WIDTH = window.innerWidth;

    useEffect(() => {
        //Set the slider position equal to 50% of the screen height for the y-axis and 95% of the screen width
        // for the x-axis
        const x = SCREEN_WIDTH -44;
        const y = SCREEN_HEIGHT * 0.5;
        setSliderPosition({x: x, y: y});
    }, [])

    const toggleMouseDownState = (newState: boolean) => {
        console.log("mouseDown " + newState)
        setMouseDown(newState);
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0]; // Get the first touch point
        let x = touch.clientX; // Get the x position
        let y = touch.clientY; // Get the y position
        if(x < 10) {
            x = 10;
            toggleMouseDownState(false);
        }
        if (x >  SCREEN_WIDTH -44) {
            x =  SCREEN_WIDTH -44;
            toggleMouseDownState(false);
        }
        if(y < 24){
            y = 24;
        }
        if(y > SCREEN_HEIGHT - 24){
            y = SCREEN_HEIGHT - 24;
        }
        setSliderPosition({x: x, y: y});
        onSlide(x, y);
        console.log(`x: ${x}, y: ${y}`);
    }

    return (
        <>
            <div style={{top:sliderPosition.y-24, left:sliderPosition.x}} onTouchMove={handleTouchMove} onClick={onClick} onMouseDown={() => toggleMouseDownState(true)} onMouseUp={() => toggleMouseDownState(false)} 
            className='z-1001 absolute w-[32px] text-black h-[48px] opacity-50 border-nex-blue border-2 bg-nex-green rounded-md '>

            </div>
        </>
    )
}

export default MapSlider

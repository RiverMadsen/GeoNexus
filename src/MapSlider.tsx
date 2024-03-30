import { useState, useEffect, useRef } from 'react'
import './App.css'

interface MapSliderProps {
    onSlide: (newX: number, newY: number) => void;
    onClick: () => void;
}
const MapSlider: React.FC<MapSliderProps> = ({ onSlide, onClick }) => {
    //const [mouseDown, setMouseDown] = useState(false);
    const [sliderPosition, setSliderPosition] = useState({ x: 0, y: 0 });
    const SCREEN_HEIGHT = window.innerHeight;
    const SCREEN_WIDTH = window.innerWidth;
    const slider = useRef(null);
    useEffect(() => {
        //Set the slider position equal to 50% of the screen height for the y-axis and 95% of the screen width
        // for the x-axis
        const x = SCREEN_WIDTH - 100;
        const y = SCREEN_HEIGHT * 0.5;
        setSliderPosition({ x: x, y: y });
    }, [])

    const handleMouseDown = () => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        if (slider.current) {
            (slider.current as HTMLDivElement).style.cursor = 'grabbing';
        }
    }

    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        if (slider.current) {
            (slider.current as HTMLDivElement).style.cursor = 'grab';
        }
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        const touch = e.touches[0]; // Get the first touch point
        //Offset by half the width so that slider comes to rest under the finger
        const x = touch.clientX - 16; 
        const y = touch.clientY; 
        handleGenericMove(x, y);
    }

    const handleMouseMove = (e: MouseEvent) => {
        if(e.buttons !== 1) {
            return;
        }
        //Offset by half the width so that slider comes to rest under the cursor
        const x = e.clientX - 16;
        const y = e.clientY; 
        handleGenericMove(x, y);
    }

    const handleGenericMove = (x: number, y: number) => {
        if (x < 10) {
            x = 10;
        }
        if (x > SCREEN_WIDTH - 44) {
            x = SCREEN_WIDTH - 44;;
        }
        if (y < 24) {
            y = 24;
        }
        if (y > SCREEN_HEIGHT - 48) {
            y = SCREEN_HEIGHT - 48;
        }
        setSliderPosition({ x: x, y: y });
        onSlide(x, y);
        return false;
    }

    return (
        <>
            <div ref={slider} style={{ top: sliderPosition.y - 24, left: sliderPosition.x }}
                onTouchMove={handleTouchMove}
                onClick={onClick}
                onMouseDown={handleMouseDown}
                className='cursor-grab z-1001 absolute w-[32px] text-black h-[48px] opacity-50 border-nex-blue border-2 bg-nex-green rounded-md '>

            </div>
        </>
    )
}

export default MapSlider

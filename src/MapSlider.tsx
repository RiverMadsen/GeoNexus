import { useState, useEffect } from 'react'
import './App.css'

interface MapSliderProps {
    onSlide: (newX: number, newY: number) => void;
    onClick: () => void;
}
const MapSlider: React.FC<MapSliderProps> = ({ onSlide, onClick }) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [sliderPosition, setSliderPosition] = useState({ x: 0, y: 0 });
    const SCREEN_HEIGHT = window.innerHeight;
    const SCREEN_WIDTH = window.innerWidth;

    useEffect(() => {
        //Set the slider position equal to 50% of the screen height for the y-axis and 95% of the screen width
        // for the x-axis
        const x = SCREEN_WIDTH - 100;
        const y = SCREEN_HEIGHT * 0.5;
        setSliderPosition({ x: x, y: y });
    }, [])

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        //setMouseDown(true);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseUp = (e: MouseEvent) => {
        //setMouseDown(false);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        const touch = e.touches[0]; // Get the first touch point
        let x = touch.clientX; // Get the x position
        let y = touch.clientY; // Get the y position
        if (x < 10) {
            x = 10;
            setMouseDown(false);
        }
        if (x > SCREEN_WIDTH - 44) {
            x = SCREEN_WIDTH - 44;
            setMouseDown(false);
        }
        if (y < 24) {
            y = 24;
        }
        if (y > SCREEN_HEIGHT - 24) {
            y = SCREEN_HEIGHT - 24;
        }
        setSliderPosition({ x: x, y: y });
        onSlide(x, y);
        return false;
    }

    const handleMouseMove = (e: MouseEvent) => {
        // if (!mouseDown) {
        //     return;
        // }
        if(e.buttons !== 1) {
            return;
        }
        let x = e.clientX - 16; // Get the x position
        let y = e.clientY; // Get the y position
        console.log("mouseMove " + x + " | " + y)
        if (x < 10) {
            x = 10;
            //toggleMouseDownState(false);
        }
        if (x > SCREEN_WIDTH - 44) {
            //debugger;
            x = SCREEN_WIDTH - 44;
            //toggleMouseDownState(false);
            //console.log("too wide: " + x + " | " + SCREEN_WIDTH )
        }
        if (y < 24) {
            y = 24;
        }
        if (y > SCREEN_HEIGHT - 48) {
            y = SCREEN_HEIGHT - 48;
        }

        setSliderPosition({ x: x, y: y });
        onSlide(x, y);
        // Rest of your code...
    }

    // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    //     if (e.buttons !== 1) {
    //         return;
    //     }
    //     let x = e.clientX - 16; // Get the x position
    //     let y = e.clientY; // Get the y position
    //     //console.log("mouseMove " + x + " | " + y)
    //     if (x < 10) {
    //         x = 10;
    //         //toggleMouseDownState(false);
    //     }
    //     if (x > SCREEN_WIDTH - 44) {
    //         //debugger;
    //         //x = SCREEN_WIDTH - 44;
    //         //toggleMouseDownState(false);
    //         //console.log("too wide: " + x + " | " + SCREEN_WIDTH )
    //     }
    //     if (y < 24) {
    //         y = 24;
    //     }
    //     if (y > SCREEN_HEIGHT - 24) {
    //         y = SCREEN_HEIGHT - 24;
    //     }

    //     setSliderPosition({ x: x, y: y });
    //     onSlide(x, y);
    //     //console.log(`x: ${x}, y: ${y}`);
    // }
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        // Disable touch scrolling on the element
        //e.currentTarget.style.touchAction = 'none';
    };
    
    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        // Re-enable touch scrolling on the element
        //e.currentTarget.style.touchAction = '';
    };
    return (
        <>
            <div style={{ top: sliderPosition.y - 24, left: sliderPosition.x }}
                onTouchMove={handleTouchMove}
                onClick={onClick}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                className='z-1001 absolute w-[32px] text-black h-[48px] opacity-50 border-nex-blue border-2 bg-nex-green rounded-md '>

            </div>
        </>
    )
}

export default MapSlider

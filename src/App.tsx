import { useState } from 'react'
import './App.css'
import Leaflet from './Leaflet'
import Menu from './Menu'
import './tailwind.css';
import MainContent from './MainContent';
import MapSlider from './MapSlider'
//TODO - consider adding overflow:hidden and overscroll-behavior: none; to html element
//see: https://www.the-koi.com/projects/how-to-disable-pull-to-refresh/
function App() {
  const SCREEN_HEIGHT = window.innerHeight;
  const SCREEN_WIDTH = window.innerWidth;
  const [menuOpen, setMenuOpen] = useState(false);
  const [sliderPosition, setSliderPosition] = useState({x: SCREEN_WIDTH-32, y: SCREEN_HEIGHT * 0.5});

  const handleSliderClick = () => {
    console.log("Slider clicked")
  }

  const handleSliderMove = (x: number, y: number) => {
    setSliderPosition({x,y});
  }
  // When the user clicks the "X" button on the menu or
  // clicks on the map while the menu is open, then the
  // menu should close. When the user clicks on the menu
  // button (aka "burger button"), then the menu should
  // toggle its state.
  const handleMenuStateChange = (actor: string) => {
    if (actor === "menu") {
      setMenuOpen(prevState => !prevState);
    }
    if (actor === "map") {
      setMenuOpen(false);
    }
  }

  return (
    <>
    
      {menuOpen && <Menu onMenuClose={() => setMenuOpen(false)} />}
      <MapSlider onClick={handleSliderClick} onSlide={handleSliderMove} />
      <MainContent requestedPosition={sliderPosition} />
      <Leaflet onMenuClick={(actor: string) => handleMenuStateChange(actor)} /> 
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Leaflet from './Leaflet'
import Menu from './Menu'
import './tailwind.css';
import MainContent from './MainContent';
import MapSlider from './MapSlider'
import { MenuContext } from './store/MenuContext';

function App() {
  const SCREEN_HEIGHT = window.innerHeight;
  const SCREEN_WIDTH = window.innerWidth;
  const [menuOpen, setMenuOpen] = useState(false);
  const [sliderPosition, setSliderPosition] = useState({ x: SCREEN_WIDTH - 32, y: SCREEN_HEIGHT * 0.5 });
  const [activeMenuItem, setActiveMenuItem] = useState('LOADING...');

  const handleSliderClick = () => {
    console.log("Slider clicked")
  }

  const handleSliderMove = (x: number, y: number) => {
    setSliderPosition({ x, y });
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
      <MenuContext.Provider value={{ activeMenuItem, setActiveMenuItem }}>
        {menuOpen && <Menu onMenuClose={() => setMenuOpen(false)} />}
        <MapSlider onClick={handleSliderClick} onSlide={handleSliderMove} />
        <MainContent requestedPosition={sliderPosition} />
        <Leaflet onMenuClick={(actor: string) => handleMenuStateChange(actor)} />
      </MenuContext.Provider>
    </>
  )
}

export default App

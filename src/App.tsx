import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Leaflet from './Leaflet'
import Menu from './Menu'
import './tailwind.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // When the user clicks the "X" button on the menu or
  // clicks on the map while the menu is open, then the
  // menu should close. When the user clicks on the menu
  // button (aka "burger button"), then the menu should
  // toggle its state.
  const handleMenuStateChange = (actor:string) => {
    if(actor === "menu"){
      setMenuOpen(prevState => !prevState);
    }
    if(actor === "map"){
      setMenuOpen(false);
    }
  }

  return (
    <>
      {menuOpen && <Menu onMenuClose={() => setMenuOpen(false)} />}
      <Leaflet onMenuClick={(actor:string) => handleMenuStateChange(actor)} />
    </>
  )
}

export default App

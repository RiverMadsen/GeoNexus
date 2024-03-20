import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Leaflet from './Leaflet'
import Menu from './Menu'
import './tailwind.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(prevState => !prevState);
  }

  return (
    <>
      {menuOpen && <Menu />}
      <Leaflet onMenuClick={handleMenuClick} />
    </>
  )
}

export default App

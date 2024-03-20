import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Leaflet from './Leaflet'
import Menu from './Menu'
import './tailwind.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Menu />
      <Leaflet />
    </>
  )
}

export default App

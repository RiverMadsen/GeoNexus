import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Leaflet from './Leaflet'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Leaflet />
    </>
  )
}

export default App

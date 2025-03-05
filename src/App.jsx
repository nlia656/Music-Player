import { useState } from 'react'
import './App.css'
import FullPlayer from './FullPlayer'
import Home from './Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
    </>
  )
}

export default App

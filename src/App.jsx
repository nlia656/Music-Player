import { useState } from 'react'
import './App.css'
import FullPlayer from './FullPlayer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FullPlayer/>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Play from './components/Play'
import Home from './components/Home'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/player" element={<Play />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

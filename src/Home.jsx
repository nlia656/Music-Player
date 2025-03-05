import { useState } from 'react'
import './Home.css'
import sunsetImage from './resources/sunset.jpg';


function Home() {

  return (
    <>
      <div>
        <div className="header">
          <img src={sunsetImage} className="thumbnail" alt="Album cover" />
          <div className="titles">
            <h3>Playlist</h3>
            <h1>Playlist Name</h1>
            <div>Play button</div>
          </div>
        </div>
        <div className="lists">
          <div>list entry 1</div>
          <div>list entry 2</div>
          <div>list entry 3</div>
          <div>list entry 4</div>
        </div>
      </div>
    </>
  )
}

export default Home

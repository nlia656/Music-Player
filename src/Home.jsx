import { useState } from 'react'
import './Home.css'
import sunsetImage from './resources/sunset.jpg';
import ListEntry from './ListEntry';


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
          <div className="list-headers">
            <div>TITLE</div>
            <div>ARTIST</div>
            <div>DATE ADDED</div>
            <div>DURATION</div>
          </div>
          <ListEntry/>
        </div>
      </div>
    </>
  )
}

export default Home

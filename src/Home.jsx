import { useState } from 'react'
import './Home.css'
import sunsetImage from './resources/sunset.jpg';
import ListEntry from './ListEntry';
import { useNavigate } from "react-router-dom";


function Home() {

  const navigate = useNavigate();

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
          <ListEntry 
          title="Sunset" 
          artist="Unknown artist"
          onClick={() => navigate("/player", { state: { title: "Sunset", artist: "Unknown artist" } })}/>
        </div>
      </div>
    </>
  )
}

export default Home

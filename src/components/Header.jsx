import sunsetImage from '../resources/sunset.jpg';
import UploadSong from './UploadSong';
import { useState, useEffect } from 'react';
import '../styles/Header.css';

function Header ({addSongTrigger}){

    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="header">
          <img src={sunsetImage} className="thumbnail" alt="Album cover" />
          <div className="titles">
            <h3>Playlist</h3>
            <h1>Playlist Name</h1>
            <div>Play button</div>
          </div>
          <button onClick={() => {setIsOpen(true), addSongTrigger}} className="add-button">Add song</button>
          <UploadSong open={isOpen} onClose={() => setIsOpen(false)}>
          </UploadSong>
        </div>
    )
}

export default Header;
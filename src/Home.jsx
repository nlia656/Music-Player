import { useState } from 'react'
import './Home.css'
import sunsetImage from './resources/sunset.jpg';
import ListEntry from './ListEntry';
import { useNavigate } from "react-router-dom";
import UploadSong from './UploadSong';
import { faL } from '@fortawesome/free-solid-svg-icons';


function Home() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [songs, setSongs] = useState([
    { title: "Sunset", artist: "Unknown artist", date: "05/03/2025", duration: "1:01" }
  ]);

  const addSong = (newSong) => {
    setSongs([...songs, newSong]);
  };


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
          <button onClick={() => setIsOpen(true)}>Add song</button>
          <UploadSong open={isOpen} onClose={() => setIsOpen(false)} onAddSong={addSong}>
          </UploadSong>
        </div>
        <div className="lists">
          <div className="list-headers">
            <div>TITLE</div>
            <div>ARTIST</div>
            <div>DATE ADDED</div>
            <div>DURATION</div>
          </div>
            {songs.map((song, index) => (
              <ListEntry
                key={index}
                title={song.title}
                artist={song.artist}
                date={song.date}
                duration={song.duration}
                onClick={() => navigate("/player", { state: { title: song.title, artist: song.artist , date: song.date, duration: song.duration} })}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default Home

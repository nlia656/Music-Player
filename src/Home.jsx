import { useState, useEffect } from 'react'
import './Home.css'
import sunsetImage from './resources/sunset.jpg';
import ListEntry from './ListEntry';
import { useNavigate } from "react-router-dom";
import UploadSong from './UploadSong';



function Home() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
    setSongs(storedSongs);
  }, []);

  const addSong = (newSong) => {
    setSongs((prevSongs) => {
      const updatedSongs = [...prevSongs, newSong];
      // Save updated list to localStorage
      localStorage.setItem('songs', JSON.stringify(updatedSongs));
      return updatedSongs;
    });
  };

  const deleteSong = (indexToDelete) => {
    setSongs((prevSongs) => {
      const updatedSongs = prevSongs.filter((_, index) => index !== indexToDelete);
      localStorage.setItem('songs', JSON.stringify(updatedSongs));
      return updatedSongs;
    });
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
          <button onClick={() => setIsOpen(true)} className="add-button">Add song</button>
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
                onClick={() => navigate("/player", { 
                  state: { 
                    title: song.title, 
                    artist: song.artist , 
                    date: song.date, 
                    duration: song.duration,
                    songFileUrl: song.songFileUrl,
                    thumbnailUrl: song.thumbnailUrl,
                    songs: songs,//list of songs
                    index: index,
                  },
                })}
                onDelete={() => deleteSong(index)}
              />
              
            ))}
            
        </div>
      </div>
    </>
  )
}

export default Home

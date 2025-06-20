import { useState, useEffect } from 'react'
import './Home.css'
import sunsetImage from './resources/sunset.jpg';
import ListEntry from './ListEntry';
import { useNavigate } from "react-router-dom";
import UploadSong from './UploadSong';
import { supabase } from './supabaseClient'



function Home() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  

  const addSong = (newSong) => {
    setSongs((prevSongs) => {
      const updatedSongs = [...prevSongs, newSong];
      // Save updated list to localStorage
      localStorage.setItem('songs', JSON.stringify(updatedSongs));
      return updatedSongs;
    });
  };

  const getSongs  = async () => {
    
    let { data: songs, error } = await supabase
      .from('songs')
      .select('created_at, song_name, artist_name, duration');
    
    if (error) {
      console.error('Error fetching songs:', error.message);
      return;
    }
    setSongs(songs);
    
  }
  useEffect(() => {
    getSongs();
  }, []);

  const deleteSong = (indexToDelete) => {
    setSongs((prevSongs) => {
      const updatedSongs = prevSongs.filter((_, index) => index !== indexToDelete);
      localStorage.setItem('songs', JSON.stringify(updatedSongs));
      return updatedSongs;
    });
  };

  const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
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
                title={song.song_name}
                artist={song.artist_name}
                date={formatTimestamp(song.created_at)}
                duration={song.duration}
                onClick={() => navigate("/player", { 
                  state: { 
                    title: song.song_name, 
                    artist: song.artist_name , 
                    date: song.created_at, 
                    duration: formatTimestamp(song.created_at),
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

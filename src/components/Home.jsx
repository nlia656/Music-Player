import { useState, useEffect } from 'react'
import '../styles/Home.css'
import ListEntry from './ListEntry';
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient';
import Header from './Header';



function Home() {

  const navigate = useNavigate();
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
      .select('*');
    
    if (error) {
      console.error('Error fetching songs:', error.message);
      return;
    }
    setSongs(songs);
  }

  useEffect(() => {
    getSongs();
    console.log(songs);
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
      <div className='home-container'>
        <Header addSongTrigger={addSong}/>
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
                    date: formatTimestamp(song.created_at), 
                    duration: song.duration,
                    songFileUrl: song.song_url,
                    thumbnailUrl: song.thumbnail_url,
                    songs: songs,//list of songs
                    index: index,
                    id: song.id,
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

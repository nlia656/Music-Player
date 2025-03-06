import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faBars, faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { useLocation, useNavigate } from "react-router-dom";

function FullPlayer() {
  const songRef = useRef(null);
  const playButtonRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  const location = useLocation();
  const { title, artist, date, duration, thumbnailUrl, songFileUrl, songs, index } = location.state || {};
  console.log(location)
  console.log(location.state.index)
  const [currentSongIndex, setCurrentSongIndex] = useState(location.state.index);
  const [currentSong, setCurrentSong] = useState(songs[currentSongIndex]);
  console.log(songs)
  console.log(currentSongIndex)
  const navigate = useNavigate();

  useEffect(() => {
    const song = songRef.current;
    
    if (song) {
      const handleTimeUpdate = () => {
        setCurrentProgress(song.currentTime);
      };

      song.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        song.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [currentSong]);

  const pressPlay = () => {
    const song = songRef.current;

    if (song) {
      if (isPlaying) {
        song.pause();
        setIsPlaying(false);
      } else {
        song.play();
        setIsPlaying(true);
      }
    }
  };

  const handleProgressChange = (event) => {
    const song = songRef.current;
    const value = event.target.value;

    if (song) {
      song.currentTime = value;
      setCurrentProgress(value);
    }
  };

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.value = currentProgress;
    }
  }, [currentProgress]);

  const replaySong = () => {
    const song = songRef.current;
    song.currentTime = 0;
    setCurrentProgress(0);
  }

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length; //% is so that if it's the last song it goes back to the start
    setCurrentSongIndex(nextIndex);
    setCurrentSong(songs[nextIndex]);
    const song = songRef.current;
    if(song){
      song.pause();
      song.load();
      song.currentTime = 0;
      setCurrentProgress(0);
      song.play();
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    setCurrentSong(songs[currentSongIndex]);
  }, [currentSongIndex, songs]);

  const songEnded = () =>{
    nextSong();
  }

  useEffect(() => {
    const song = songRef.current;
    if (song) {
      song.play();  // Play the song immediately
      setIsPlaying(true);  // Set the playing state
    }
  }, [currentSong]);

  return (
    <div className="container">
      <div className="music-player">
        <nav>
          <div className="circle-button" onClick={()=>navigate("/")}>
            <FontAwesomeIcon icon={faAngleLeft} size="lg" />
          </div>
          <div className="circle-button">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </div>
        </nav>
        <img src={currentSong.thumbnailUrl} className="thumbnail" alt="Album cover" />
        <h1>{currentSong.title}</h1>
        <p>{currentSong.artist}</p>

        <audio ref={songRef} onEnded={songEnded} key={currentSongIndex}>
          <source src={currentSong.songFileUrl} type="audio/mpeg" />
        </audio>

        <input
          type="range"
          ref={progressRef}
          value={currentProgress}
          onChange={handleProgressChange}
          min="0"
          max={songRef.current ? songRef.current.duration : 100}
          id="progress"
        />

        <div className="timers">
          <div id="currentTime">{`${Math.floor(currentProgress / 60)}:${Math.round(currentProgress % 60).toString().padStart(2, '0')}`}</div>
          <div id="maxTime">{currentSong.duration}</div>
        </div>

        <div className="controls">
          <div onClick={replaySong}>
            <FontAwesomeIcon icon={faBackwardStep} size="lg" />
          </div>
          <div onClick={pressPlay}>
            <FontAwesomeIcon
              ref={playButtonRef}
              icon={isPlaying ? faPause : faPlay} 
              size="lg"
            />
          </div>
          <div onClick={nextSong}>
            <FontAwesomeIcon icon={faForwardStep} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPlayer;

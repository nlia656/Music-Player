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
  const { title, artist, date, duration, thumbnailUrl, songFileUrl } = location.state || {};
  console.log(location.state);

  const navigate = useNavigate();

  useEffect(() => {
    const song = songRef.current;
    const progress = progressRef.current;
    
    if (song && progress) {
      const intervalId = setInterval(() => {
        if (song.paused) return;
        setCurrentProgress(song.currentTime);
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [isPlaying]);

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
        <img src={thumbnailUrl} className="thumbnail" alt="Album cover" />
        <h1>{title}</h1>
        <p>{artist}</p>

        <audio ref={songRef}>
          <source src={songFileUrl} type="audio/mpeg" />
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
          <div id="maxTime">{songRef.current ? `${Math.floor(songRef.current.duration / 60)}:${Math.round(songRef.current.duration % 60).toString().padStart(2, '0')}` : "00:00"}</div>
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
          <div>
            <FontAwesomeIcon icon={faForwardStep} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPlayer;

import '../styles/SoundboardButton.css'
import React, { useState, useRef, useEffect } from 'react';

function SoundboardButton( { icon, sound, keybind, soundName } ) {
  const soundRef = useRef(null);
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key == keybind) {
        playSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keybind]);

  const playSound = () => {
    const sound = soundRef.current;
    sound.currentTime = 0;
    sound.play();
  };


  return (
    <div className="soundboard-button">
        <audio ref={soundRef}>
          <source src={sound} type="audio/mpeg" />
        </audio>
        <img className="sound-icon" src={icon} alt="Soundboard Button"/>
        <div className="button-info">
          <div>{soundName}</div>
          <div onClick={playSound}>[{keybind}]</div>
        </div>
    </div>
  )
}

export default SoundboardButton

import '../styles/SoundboardButton.css'
import React, { useState, useRef, useEffect } from 'react';

function SoundboardButton( { icon, sound, keybind, soundName } ) {
  const soundRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key == keybind) {
        setIsPressed(true);
        playSound();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key.toLowerCase() === keybind.toLowerCase()) {
        setIsPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keybind]);

  const playSound = () => {
    const sound = soundRef.current;
    sound.currentTime = 0;
    sound.play();
  };


  return (
    <div onClick={playSound} className={`soundboard-button ${isPressed ? 'pressed' : ''}`}>
        <audio ref={soundRef}>
          <source src={sound} type="audio/mpeg" />
        </audio>
        <img className="sound-icon" src={icon} alt="Soundboard Button"/>
        <div className="button-info">
          <div>{soundName}</div>
          <div>[{keybind}]</div>
        </div>
    </div>
  )
}

export default SoundboardButton

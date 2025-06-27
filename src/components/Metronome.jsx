import '../styles/BPMFinder.css'
import { useState, useEffect, useRef } from 'react'



function Metronome() {
    const [isMetronomeRunning, setIsMetronomeRunning] = useState(false);
    const [bpm, setBpm] = useState(1);
    const kickSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//kick-drum.mp3';
    const soundRef = useRef(null);

    useEffect(() => {
        let interval;
        if (isMetronomeRunning){
            interval = setInterval(() => {
                playSound();
            }, (60/bpm)*1000);
        }

        return () => clearInterval(interval);
    }, [isMetronomeRunning]);

    const playSound = () => {
        const sound = soundRef.current;
        sound.currentTime = 0;
        sound.play();
    };

    return (
        <div>
            <input type="number" min="1" step="1" onChange={e => setBpm(e.target.value)}/>
            {isMetronomeRunning ? 
            <button onClick={() => setIsMetronomeRunning(false)}>
                Stop
            </button> : 
            <button onClick={() => setIsMetronomeRunning(true)}>
                Start
            </button>}
            <audio ref={soundRef}>
                <source src={kickSound} type="audio/mpeg" />
            </audio>
        </div>
    )
}

export default Metronome;

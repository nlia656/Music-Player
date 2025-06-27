import '../styles/BPMFinder.css'
import { useState, useEffect } from 'react'



function BPMFinder() {
    const [seconds, setSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [beats, setBeats] = useState(1);
    const [bpm, setBpm] = useState(0);

    useEffect(() => {
        let interval;
        if (isTimerRunning){
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 0.01);
            }, 10);
        }

        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const stopTimer = () => {
        setIsTimerRunning(false);
        const bpm = Math.round((beats / seconds) * 60);
        setSeconds(0);
        setBpm(bpm);
    }

    return (
        <div>
            <input type="number" min="1" step="1" onChange={e => setBeats(e.target.value)}/>
            {isTimerRunning ? 
            <button onClick={() => stopTimer()}>
                Stop
            </button> : 
            <button onClick={() => setIsTimerRunning(true)}>
                Start
            </button>}
            <div>
                {bpm}
            </div>
        </div>
    )
}

export default BPMFinder;

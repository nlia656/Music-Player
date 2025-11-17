import GridButton from "./GridButton";
import "../styles/RhythmGrid.css"
import {useState, useRef, useEffect} from 'react';

function RhythmRow({icon, sound, play}){
    const soundRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [buttons, setButtons] = useState(
        Array.from({ length: 8 }, () => ({ isActive: false }))
    );

    const bpm = 240;
    const delay = 60000/bpm;

    const toggleButton = (index) => {
        setButtons((prev) => {
        const copy = prev.map((b, i) => (i === index ? { ...b, isActive: !b.isActive } : b));
        return copy;
        });
    };

    useEffect(()=>{
        let cancelled = false;
        async function playRow(){
            while (play && !cancelled){
                for(let i=0; i<buttons.length;i++){
                    if(buttons[i].isActive){
                        playSound();
                    }
                    await sleep(delay);
                }
            }
        };

        if (play){
            playRow();
        }
        return () => {
            cancelled = true;
        }
    }, [play]);

    

    const playSound = () => {
        const sound = soundRef.current;
        sound.currentTime = 0;
        sound.play();
    };
    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    return(
        <>
            <div className="rhythm-row">
                <audio ref={soundRef}>
                    <source src={sound} type="audio/mpeg" />
                </audio>
                <img className="grid-icon" src={icon} alt="Grid Icon"/>
                {buttons.map((btn, i) => (
                    <GridButton
                    key={i}
                    isActive={btn.isActive}
                    onToggle={() => toggleButton(i)}
                    />
                ))}
            </div> 
        </>
    )
}

export default RhythmRow
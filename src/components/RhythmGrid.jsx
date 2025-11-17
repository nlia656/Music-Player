import RhythmRow from "./RhythmRow";
import "../styles/RhythmGrid.css"
import { useState } from "react";

function RhythmGrid({kickIcon, clHiHatIcon, opHiHatIcon, snareIcon}) {
    const kickSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//kick-drum.mp3';
    const clHiHatSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//cl-hihat.mp3';
    const opHiHatSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//op-hihat.mp3';
    const snareSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//snare.mp3';

    const [play, setPlay] = useState(false);
    console.log(play);
    return(
    <div className="rhythm-grid">
        <div>
            {play ? <button onClick={() => setPlay(false)}>Stop</button> : <button onClick={() => setPlay(true)}>Play</button>}
        </div>
       <RhythmRow icon={kickIcon} sound={kickSound} play={play}></RhythmRow>
       <RhythmRow icon={clHiHatIcon} sound={clHiHatSound} play={play}></RhythmRow>
       <RhythmRow icon={opHiHatIcon} sound={opHiHatSound} play={play}></RhythmRow>
       <RhythmRow icon={snareIcon} sound={snareSound} play={play}></RhythmRow>
    </div>
    )
}

export default RhythmGrid;
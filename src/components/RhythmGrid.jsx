import RhythmRow from "./RhythmRow";
import "../styles/RhythmGrid.css"

function RhythmGrid({kickIcon, clHiHatIcon, opHiHatIcon, snareIcon}) {
    return(
    <div className="rhythm-grid">
       <RhythmRow icon={kickIcon}></RhythmRow>
       <RhythmRow icon={clHiHatIcon}></RhythmRow>
       <RhythmRow icon={opHiHatIcon}></RhythmRow>
       <RhythmRow icon={snareIcon}></RhythmRow>
    </div>
    )
}

export default RhythmGrid;
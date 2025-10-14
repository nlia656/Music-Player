import GridButton from "./GridButton";
import "../styles/RhythmGrid.css"

function RhythmGrid() {
    return(
    <>
       <div className="rhythm-row">
            <GridButton/>
            <GridButton/>
            <GridButton/>
            <GridButton/>
        </div> 
    </>
    )
}

export default RhythmGrid;
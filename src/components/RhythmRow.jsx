import GridButton from "./GridButton";
import "../styles/RhythmGrid.css"

function RhythmRow({icon}){

    return(
        <>
            <div className="rhythm-row">
                <img className="grid-icon" src={icon} alt="Grid Icon"/>
                <GridButton/>
                <GridButton/>
                <GridButton/>
                <GridButton/>
                <GridButton/>
                <GridButton/>
                <GridButton/>
                <GridButton/>
            </div> 
        </>
    )
}

export default RhythmRow
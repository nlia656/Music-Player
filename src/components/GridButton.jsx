import "../styles/GridButton.css"
import {useState} from 'react';

function GridButton ({ isActive, onToggle, isPlaying }) {

    return(
        <div
            className="gridSquare"
            onClick={onToggle}
            style={{ background: isActive ? "#aab99c" : "none", border: isPlaying ? "1px solid yellow" : "2px solid black" }}
        />
    )
}

export default GridButton;
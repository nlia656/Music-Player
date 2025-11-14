import "../styles/GridButton.css"
import {useState} from 'react';

function GridButton ({ isActive, onToggle }) {

    return(
        <div
            className="gridSquare"
            onClick={onToggle}
            style={{ background: isActive ? "#aab99c" : "none" }}
        />
    )
}

export default GridButton;
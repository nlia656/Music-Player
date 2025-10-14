import "../styles/GridButton.css"
import {useState} from 'react';

function GridButton () {
    const [isClicked, setIsClicked] = useState(false);

    return(
    <div className="gridSquare" onClick={() => (isClicked ? setIsClicked(false) : setIsClicked(true))} style = {{background: (isClicked ? "#aab99c" : "none")}}>

    </div>
    )
}

export default GridButton;
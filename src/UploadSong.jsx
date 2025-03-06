import React from 'react'
import ReactDom from 'react-dom'
import "./index.css"

function UploadSong({children, open, onClose}) {
    if(!open){
        return null;
    }
    return ReactDom.createPortal(
        <>
            <div className="overlay"></div>
            <div className="modal">
                <button onClick={onClose}>Close modal</button>
                {children}
            </div>
        </>,
        document.getElementById("portal")
    )

}

export default UploadSong
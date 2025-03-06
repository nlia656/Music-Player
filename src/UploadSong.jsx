import { React, useState} from 'react'
import ReactDom from 'react-dom'
import "./modal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function UploadSong({onAddSong, open, onClose}) {
    const [thumbnail, setThumbnail] = useState(null);
    const [songFile, setSongFile] = useState(null);
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!songFile) {
          alert('Please upload a song!');
          return;
        }
    
        const newSong = {
          title: songName,
          artist: artistName,
          date: new Date().toLocaleDateString(),
          duration: '3:30',
        };
    
        onAddSong(newSong);
        onClose();
      };
    
    if(!open){
        return null;
    }
    return ReactDom.createPortal(
        <>
            <div className="overlay"></div>
            <div className="modal">
            <h2>Upload Song</h2>
                <nav className="close-button">
                    <div className="circle-button" onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </div>
                </nav>
                <form className="inputs" onSubmit={handleSubmit}>
                    <div>
                        <label for="inputThumbnail">Upload image:</label>
                        <input type="file" name="inputThumbnail" id="inputThumbnail" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])}/>
                    </div>
                    <div>
                        <label for="songFile">Upload song (mp3):</label>
                        <input type="file" name="songFile" id="songFile" accept=".mp3,audio/*" required onChange={(e) => setSongFile(e.target.files[0])}/>
                    </div>
                    <div>
                        <label for="songName" autoComplete="off">Song name:</label>
                        <input type="text" name="songName" id="songName" onChange={(e) => setSongName(e.target.value)}/>
                    </div>
                    <div>
                        <label for="artistName" autoComplete="off">Artist name:</label>
                        <input type="text" name="artistName" id="artistName" onChange={(e) => setArtistName(e.target.value)}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </>,
        document.getElementById("portal")
    )

}

export default UploadSong
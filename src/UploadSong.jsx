import { React, useState, useEffect} from 'react'
import ReactDom from 'react-dom'
import "./modal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { supabase } from './supabaseClient'

function UploadSong({onAddSong, open, onClose}) {
    const [thumbnail, setThumbnail] = useState(null);
    const [songFile, setSongFile] = useState(null);
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [duration, setDuration] = useState(null);

    

    function sanitiseFileName(name) {
        return name
            .normalize('NFKD') // normalize unicode chars
            .replace(/[^\w\-\.]+/g, '_') // replace non-alphanumeric, dash, dot with _
            .replace(/_+/g, '_') // collapse multiple underscores
            .replace(/^_+|_+$/g, '') // trim leading/trailing underscores
    }

    const handleSongFileChange = (e) => {
        const file = e.target.files[0];
        setSongFile(file);

        if (file) {
            const audio = new Audio(URL.createObjectURL(file));

            audio.onloadedmetadata = () => {
                // get the duration of the song
                const songDuration = audio.duration;
                const minutes = Math.floor(songDuration / 60);
                const seconds = Math.round(songDuration % 60);
                setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
            };
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!songFile || !thumbnail) {
          alert('Please upload a song!');
          return;
        }

        try {
            // Generate unique file names (e.g. add timestamp)
            const songFileName = `${Date.now()}_${sanitiseFileName(songFile.name)}`;
            const thumbnailFileName = `${Date.now()}_${sanitiseFileName(thumbnail.name)}`;

            // Upload files to Supabase Storage buckets
            const bucket = supabase.storage.from('songs')
            let { error } = await bucket.upload(`/${songFileName}`, songFile);
            if (error) {
                console.error('Error uploading file:', error.message);
            }

            const thumbnailBucket = supabase.storage.from('thumbnails')
            let { errorThumbnail } = await thumbnailBucket.upload(`/${thumbnailFileName}`, thumbnail);
            if (errorThumbnail) {
                console.error('Error uploading thumbnail:', errorThumbnail.message);
            }

            const songFileUrl = `https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/songs/${songFileName}`;
            const thumbnailUrl = `https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/thumbnails/${thumbnailFileName}`;

            // Insert new song metadata in your database
            const { data, error: dbError } = await supabase
            .from('songs')
            .insert([{
                created_at: new Date().toISOString(),
                artist_name: artistName,
                thumbnail_url: thumbnailUrl,
                song_url: songFileUrl,
                song_name: songName,  
                duration: duration,
            }]);

            if (dbError) throw dbError;

            // Notify parent with new song from database
            //onAddSong(data[0]);
            onClose();

        } catch (error) {
            alert('Error uploading song: ' + error.message)
        }
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
                        <input type="file" name="inputThumbnail" id="inputThumbnail" accept="image/*" required onChange={(e) => setThumbnail(e.target.files[0])}/>
                    </div>
                    <div>
                        <label for="songFile">Upload song (mp3):</label>
                        <input type="file" name="songFile" id="songFile" accept=".mp3,audio/*" required onChange={handleSongFileChange}/>
                    </div>
                    <div>
                        <label for="songName">Song name:</label>
                        <input type="text" name="songName" id="songName" autoComplete="off" onChange={(e) => setSongName(e.target.value)}/>
                    </div>
                    <div>
                        <label for="artistName">Artist name:</label>
                        <input type="text" name="artistName" id="artistName" autoComplete="off" onChange={(e) => setArtistName(e.target.value)}/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </>,
        document.getElementById("portal")
    )

}

export default UploadSong
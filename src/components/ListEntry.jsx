import '../styles/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ListEntry({ title, artist, date, duration, onClick, onDelete }) {

    const deleteSong = (e) => {
        e.stopPropagation();
        onDelete();
    };

    return<>
    <div className="list-entry" onClick={onClick}>
        <div>{title}</div>
        <div>{artist}</div>
        <div>{date}</div>
        <div>{duration}</div>
        <div className="delete" onClick={deleteSong}><FontAwesomeIcon icon={faTrash} /></div>
    </div>
    </>
}

export default ListEntry
import './Home.css'

function ListEntry({ title, artist, date, duration, onClick }) {
    return<>
    <div className="list-entry" onClick={onClick}>
        <div>{title}</div>
        <div>{artist}</div>
        <div>{date}</div>
        <div>{duration}</div>
    </div>
    </>
}

export default ListEntry
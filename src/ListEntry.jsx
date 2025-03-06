import './Home.css'

function ListEntry({ title, artist, onClick }) {
    return<>
    <div className="list-entry" onClick={onClick}>
        <div>{title}</div>
        <div>{artist}</div>
        <div>5/3/2025</div>
        <div>1.01</div>
    </div>
    </>
}

export default ListEntry
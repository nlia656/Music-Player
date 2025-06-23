import '../styles/SoundboardButton.css'


function SoundboardButton( { icon } ) {

  return (
    <div className="soundboard-button">
        <img className="sound-icon" src={icon} alt="Soundboard Button"/>
        <div>Keybind</div>
    </div>
  )
}

export default SoundboardButton

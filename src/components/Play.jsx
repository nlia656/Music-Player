import '../styles/Play.css'
import FullPlayer from './FullPlayer'
import Soundboard from './Soundboard'


function Play() {

  return (
    <div className="playbox">
      <FullPlayer className="full-player"/>
      <Soundboard className="soundboard"/>
    </div>
  )
}

export default Play

import '../styles/Play.css'
import FullPlayer from './FullPlayer'
import Soundboard from './Soundboard'
import RhythmGrid from './RhythmGrid'

function Play() {

  return (
    <div className="playbox">
      <FullPlayer className="full-player"/>
      <div className='button-column'>
        <Soundboard className="soundboard"/>
        <RhythmGrid />
      </div>
    </div>
  )
}

export default Play

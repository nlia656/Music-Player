import '../styles/Play.css'
import FullPlayer from './FullPlayer'
import Soundboard from './Soundboard'
import RhythmGrid from './RhythmGrid'
import kick from '../resources/kick.png'
import clHiHat from '../resources/cl-hihat.png'
import opHiHat from '../resources/op-hihat.png'
import snare from '../resources/snare.png'

function Play() {

  return (
    <div className="playbox">
      <FullPlayer className="full-player"/>
      <div className='button-column'>
        <Soundboard className="soundboard" kickIcon={kick} clHiHatIcon={clHiHat} opHiHatIcon={opHiHat} snareIcon={snare}/>
        <RhythmGrid kickIcon={kick} clHiHatIcon={clHiHat} opHiHatIcon={opHiHat} snareIcon={snare}/>
      </div>
    </div>
  )
}

export default Play

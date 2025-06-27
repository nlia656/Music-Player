import '../styles/Play.css'
import FullPlayer from './FullPlayer'
import Soundboard from './Soundboard'
import BPMFinder from './BPMFinder'


function Play() {

  return (
    <div className="playbox">
      <FullPlayer className="full-player"/>
      <div>
        <Soundboard className="soundboard"/>
        <BPMFinder/>
      </div>
    </div>
  )
}

export default Play

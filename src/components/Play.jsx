import '../App.css'
import FullPlayer from './FullPlayer'
import SoundboardButton from './SoundboardButton'
import kick from '../resources/kick.png'


function Play() {

  return (
    <>
      <FullPlayer/>
      <SoundboardButton icon={kick}/>
    </>
  )
}

export default Play

import '../App.css'
import FullPlayer from './FullPlayer'
import SoundboardButton from './SoundboardButton'
import kick from '../resources/kick.png'
import clHiHat from '../resources/cl-hihat.png'
import opHiHat from '../resources/op-hihat.png'
import snare from '../resources/snare.png'

function Play() {
  const kickSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//kick-drum.mp3';
  const clHiHatSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//cl-hihat.mp3';
  const opHiHatSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//op-hihat.mp3';
  const snareSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//snare.mp3';

  return (
    <div className="playbox">
      <FullPlayer/>
      <div className="soundboard">
        <SoundboardButton icon={kick} sound={kickSound} keybind={"q"} soundName={"Kick"}/>
        <SoundboardButton icon={clHiHat} sound={clHiHatSound} keybind={"w"} soundName={"Closed Hi-hat"}/>
        <SoundboardButton icon={opHiHat} sound={opHiHatSound} keybind={"e"} soundName={"Open Hi-hat"}/>
        <SoundboardButton icon={snare} sound={snareSound} keybind={"r"} soundName={"Snare"}/>
      </div>
    </div>
  )
}

export default Play

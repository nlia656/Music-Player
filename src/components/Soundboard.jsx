import '../App.css'
import React, { useState, useRef, useEffect } from 'react';
import kick from '../resources/kick.png'
import clHiHat from '../resources/cl-hihat.png'
import opHiHat from '../resources/op-hihat.png'
import snare from '../resources/snare.png'
import SoundboardButton from './SoundboardButton';

function Soundboard( { icon, sound, keybind, soundName } ) {
    const kickSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//kick-drum.mp3';
    const clHiHatSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//cl-hihat.mp3';
    const opHiHatSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//op-hihat.mp3';
    const snareSound = 'https://rvaugnusjthsxxhohiuy.supabase.co/storage/v1/object/public/soundboard//snare.mp3';

  return (
    <div className="soundboard">
        <SoundboardButton icon={kick} sound={kickSound} keybind={"q"} soundName={"Kick"}/>
        <SoundboardButton icon={clHiHat} sound={clHiHatSound} keybind={"w"} soundName={"Closed Hi-hat"}/>
        <SoundboardButton icon={opHiHat} sound={opHiHatSound} keybind={"e"} soundName={"Open Hi-hat"}/>
        <SoundboardButton icon={snare} sound={snareSound} keybind={"r"} soundName={"Snare"}/>
    </div>
  )
}

export default Soundboard

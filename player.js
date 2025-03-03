let progress = document.getElementById("progress");
let song = document.getElementById("song");
let playButton = document.getElementById("playButton");
let currentTime = document.getElementById("currentTime");
let maxTime = document.getElementById("maxTime");

song.onloadedmetadata = function(){
    progress.max = song.duration;
    console.log(song.duration);
    const minutes = Math.floor(song.duration / 60);
    const roundedSeconds = Math.round(song.duration % 60);
    maxTime.innerHTML = `${minutes}:${roundedSeconds.toString().padStart(2, '0')}`;
    progress.value = song.currentTime;
    song.pause();
}

function pressPlay(){
    console.log("button pressed");
    if(playButton.classList.contains("fa-pause")){
        song.pause();
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
    } else {
        song.play();
        playButton.classList.add("fa-pause");
        playButton.classList.remove("fa-play");
    }
}

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
        const minutes = Math.floor(song.currentTime / 60);
        const roundedSeconds = Math.round(song.currentTime % 60);
        currentTime.innerHTML = `${minutes}:${roundedSeconds.toString().padStart(2, '0')}`;
    },500);
}

progress.addEventListener('input', function() {
    song.currentTime = progress.value;
});
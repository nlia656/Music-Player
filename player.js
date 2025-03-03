let progress = document.getElementById("progress");
let song = document.getElementById("song");
let playButton = document.getElementById("playButton");

song.onloadedmetadata = function(){
    progress.max = song.duration;
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
    },500);
}

progress.addEventListener('input', function() {
    song.currentTime = progress.value;
});
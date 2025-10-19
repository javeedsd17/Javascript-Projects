let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seekSlider = document.getElementById('seekSlider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let repeatIcon = document.querySelector('.fa-redo');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let updateTimer;

const music_list = [
    { img:'images/Stay.png', name:'Stay', artist:'The Kid LAROI, Justin Bieber', music:'music/Stay.mp3' },
    { img:'images/FallingDown.jpg', name:'Falling Down', artist:'Wid Cards', music:'music/FallingDown.mp3' },
    { img:'images/Faded.png', name:'Faded', artist:'Alan Walker', music:'music/Faded.mp3' },
    { img:'images/Ratherbe.jpg', name:'Rather Be', artist:'Clean Bandit', music:'music/Rather Be.mp3' },
    { img:'images/DeathNote.png', name:'Death Note', artist:'Hideki Taniuchi', music:'music/deathnote.mpeg' },
    { img:'images/TrueDetective.jpg', name:'True Detective', artist:'T Bone Burnett', music:'music/TrueDetective.mpeg' },
    { img:'images/Dark.jpg', name:'Dark', artist:'Apparat Soap&Skin', music:'music/Dark.mpeg' }
];

loadTrack(track_index);

function loadTrack(index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[index].music;
    curr_track.load();

    track_art.style.backgroundImage = `url(${music_list[index].img})`;
    track_name.textContent = music_list[index].name;
    track_artist.textContent = music_list[index].artist;
    now_playing.textContent = `Playing music ${index+1} of ${music_list.length}`;

    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seekSlider.style.width = '0%';
}

function playpauseTrack(){ isPlaying ? pauseTrack() : playTrack(); }

function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack(){
    if(isRepeat){
        loadTrack(track_index);
    } else if(isRandom){
        track_index = Math.floor(Math.random() * music_list.length);
        loadTrack(track_index);
    } else {
        track_index = (track_index + 1) % music_list.length;
        loadTrack(track_index);
    }
    playTrack();
}

function prevTrack(){
    if(isRandom){
        track_index = Math.floor(Math.random() * music_list.length);
    } else {
        track_index = (track_index - 1 + music_list.length) % music_list.length;
    }
    loadTrack(track_index);
    playTrack();
}

function setVolume(){ curr_track.volume = volume_slider.value / 100; }

function setUpdate(){
    if(!isNaN(curr_track.duration)){
        let progressPercent = (curr_track.currentTime / curr_track.duration) * 100;
        seekSlider.style.width = `${progressPercent}%`;

        let cMinutes = Math.floor(curr_track.currentTime / 60);
        let cSeconds = Math.floor(curr_track.currentTime % 60);
        let dMinutes = Math.floor(curr_track.duration / 60);
        let dSeconds = Math.floor(curr_track.duration % 60);
        if(cSeconds<10) cSeconds='0'+cSeconds;
        if(dSeconds<10) dSeconds='0'+dSeconds;
        if(cMinutes<10) cMinutes='0'+cMinutes;
        if(dMinutes<10) dMinutes='0'+dMinutes;
        curr_time.textContent = `${cMinutes}:${cSeconds}`;
        total_duration.textContent = `${dMinutes}:${dSeconds}`;
    }
}

// Shuffle & Repeat
function randomTrack(){ isRandom ? pauseRandom() : playRandom(); }
function playRandom(){ isRandom=true; randomIcon.classList.add('randomActive'); }
function pauseRandom(){ isRandom=false; randomIcon.classList.remove('randomActive'); }

function repeatTrack(){ isRepeat ? pauseRepeat() : playRepeat(); }
function playRepeat(){ isRepeat=true; repeatIcon.classList.add('repeatActive'); }
function pauseRepeat(){ isRepeat=false; repeatIcon.classList.remove('repeatActive'); }

// Click to seek
function clickSeek(event){
    let rect = event.currentTarget.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let width = rect.width;
    curr_track.currentTime = (clickX / width) * curr_track.duration;
}

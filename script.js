const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const songs = ['crumb - trophy', 'fka twigs - sushi', 'kelela - contact', 'ravyn lenae - venom', 'rochelle jordan - the boy'];
let songIndex = 0;

// load song
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

loadSong(songs[songIndex]);

function playSong() {
  musicContainer.classList.add('play');
  cover.classList.add('rotating');
  playBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  cover.classList.remove('rotating');
  playBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
  audio.pause();
}


// toggle play/pause
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length
  loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// auto next when song ends
audio.addEventListener('ended', nextSong);

// progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
}

audio.addEventListener('timeupdate', updateProgress);

// click to seek
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

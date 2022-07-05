// get our elements
const video = document.querySelector('.player__video');
const progress = document.querySelector('.progress__filled');
const playButton = document.querySelector('.player__button');
const volume = document.querySelector('input[name=volume]');
const playbackRate = document.querySelector('input[name=playbackRate]');
const skipRewind = document.querySelector('button[data-skip="-10"]');
const skipFoward = document.querySelector('button[data-skip="25"]');

// build our functions
function handlePlay() {
  if (video.paused) {
    video.play();
    playButton.innerHTML = "&#10073;&#10073;";
  } else {
    video.pause();
    playButton.innerHTML = "►";
  }
}

function updateProgress() {
  // fill our progress bar
  setInterval(function () {
    let progressBar = Math.round((video.currentTime / video.duration) * 100);
    progress.style.flexBasis = `${progressBar}%`
  })
}

function handleVolume() {
  // turn our volume up or down
  video.volume = this.value;
}

function handlePlaybackRate() {
  // turn our rate up or down
  video.playbackRate = this.value;
}

function handleRewind() {
  // rewind 10s (value in our data-skip)
  video.currentTime -= 10
}

function handleFoward() {
  // foward 25s (value in our data-skip)
  video.currentTime += 25
}

// hook up the event listeners
playButton.addEventListener('click', handlePlay);
volume.addEventListener('input', handleVolume);
playbackRate.addEventListener('input', handlePlaybackRate);
skipRewind.addEventListener('click', handleRewind);
skipFoward.addEventListener('click', handleFoward);
video.addEventListener('play', updateProgress);

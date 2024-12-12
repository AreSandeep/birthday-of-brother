// Ensure audio plays only when an image is clicked
const audio = document.getElementById('background-music');
const images = document.querySelectorAll('.paper');
images.forEach(image => {
  image.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    }
  });
});

// Play button for mobile if audio doesn't autoplay
const playButton = document.getElementById('play-audio');
playButton.addEventListener('click', () => {
  audio.play();
  playButton.style.display = 'none'; // Hide the play button after clicking
});

// Ensure play button is visible first
document.getElementById('play-audio').style.display = 'inline-block';

// Check if audio can autoplay, otherwise show play button
audio.oncanplaythrough = function() {
  if (audio.paused) {
    playButton.style.display = 'inline-block';
  }
};


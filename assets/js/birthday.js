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

const papers = document.querySelectorAll('.paper');
let highestZ = 1;

// Auto-dragging each paper
papers.forEach((paper, index) => {
  setTimeout(() => {
    // Dragging images from the left to right
    paper.style.transform = `translate(${(index * 160)}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 30 - 15}deg)`;
    paper.style.zIndex = highestZ++;
    paper.style.opacity = 1;

    // Settle papers in a row from left to right after dragging
    setTimeout(() => {
      const settleY = window.innerHeight / 2 - 100; // Middle position vertically
      paper.style.transform = `translate(${index * 160}px, ${settleY}px) rotate(0deg)`;
    }, 3000);
  }, index * 1000); // Stagger animations
});
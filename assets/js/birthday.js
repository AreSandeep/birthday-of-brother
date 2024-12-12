// Auto-dragging each paper
const papers = document.querySelectorAll('.paper');
let highestZ = 1;

// Adjusting image movement and positioning
papers.forEach((paper, index) => {
  setTimeout(() => {
    // Dragging images from the left to right
    paper.style.transform = `translate(${(index * 90)}px) rotate(0deg)`; // Align images horizontally
    paper.style.zIndex = highestZ++;
    paper.style.opacity = 1;
    
    // Final position is at the top of the screen
    setTimeout(() => {
      paper.style.transform = `translate(${index * 90}px, 20px) rotate(0deg)`; // Settle at top position
    }, 3000);
  }, index * 1000); // Stagger animations
});

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


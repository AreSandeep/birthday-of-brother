// Ensure audio plays only when the play button is clicked
const audio = document.getElementById('background-music');
const playButton = document.getElementById('play-audio');

// Show the play button first
playButton.style.display = 'inline-block';

// When the play button is clicked, hide it and start playing the audio
playButton.addEventListener('click', () => {
  audio.play();
  playButton.style.display = 'none'; // Hide the play button after clicking
});

// Play audio when images are clicked (if audio isn't already playing)
const images = document.querySelectorAll('.paper');
images.forEach(image => {
  image.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    }
  });
});


// Function to check if all images are dragged
function checkIfAllImagesDragged() {
  draggedImagesCount++;
  const papers = document.querySelectorAll('.paper');
  if (draggedImagesCount === papers.length) {
    document.getElementById('birthday-box').style.opacity = 1;
    document.getElementById('birthday-box').style.transform = 'scale(1)';
  }
}

// Initialize dragging functionality for each paper
const papers = document.querySelectorAll('.paper');
papers.forEach((paper) => {
  const paperObject = new Paper();
  paperObject.init(paper);
});

// Delay the appearance of the drag instruction
setTimeout(function() {
  document.getElementById('drag-instruction').style.opacity = 1;
}, 1000);

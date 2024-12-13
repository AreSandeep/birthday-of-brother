// Ensure audio plays only when an image is clicked
const audio = document.getElementById('background-music');
const images = document.querySelectorAll('.paper img');
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

// Dragging functionality
const papers = document.querySelectorAll('.paper');
let zIndex = 1;

papers.forEach(paper => {
  paper.addEventListener('mousedown', (e) => startDrag(e, paper));
  paper.addEventListener('mousemove', (e) => drag(e, paper));
  paper.addEventListener('mouseup', () => stopDrag(paper));
});

function startDrag(e, paper) {
  paper.dataset.dragging = "true";
  paper.style.zIndex = zIndex++;
  paper.dataset.offsetX = e.clientX - paper.offsetLeft;
  paper.dataset.offsetY = e.clientY - paper.offsetTop;
}

function drag(e, paper) {
  if (paper.dataset.dragging === "true") {
    paper.style.left = `${e.clientX - paper.dataset.offsetX}px`;
    paper.style.top = `${e.clientY - paper.dataset.offsetY}px`;
    paper.style.position = 'absolute';
  }
}

function stopDrag(paper) {
  paper.dataset.dragging = "false";
}

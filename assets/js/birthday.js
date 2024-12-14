// Automatically play audio when the page loads
const audio = document.getElementById('background-music');
const audioButton = document.getElementById('audio-button');

audio.play().catch(() => {
  console.log("Audio autoplay blocked by browser");
});

// Dragging functionality
const papers = document.querySelectorAll('.paper');
let zIndex = 1;

// Position and animate images from the center to leftmost to rightmost
papers.forEach((paper, index) => {
  paper.style.left = '50%'; // Start from center
  paper.style.top = '50%'; // Start from center
  paper.style.transform = 'translate(-50%, -50%)';
  
  setTimeout(() => {
    paper.style.opacity = '1';
    paper.style.transition = `all 3s ease-in-out ${index * 0.5}s`; // Staggered animation
    paper.style.left = `${10 + index * 15}%`; // Positioning across the screen
    paper.style.top = `${index % 2 === 0 ? '40%' : '60%'}`; // Alternate vertical position
  }, 500);

  // Enable dragging functionality
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

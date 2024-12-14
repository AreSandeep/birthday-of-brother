const audio = document.getElementById('background-music');
let isPlaying = false; // Track audio state

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

  // Enable dragging functionality after animation completes
  setTimeout(() => {
    enableDragging(paper);
  }, 3500 + index * 500); // Wait for animation to finish
});

// Enable dragging functionality
function enableDragging(paper) {
  paper.addEventListener('mousedown', (e) => {
    startDrag(e, paper);

    // Play audio on drag start
    if (!isPlaying) {
      audio.play().catch(() => {
        console.log('Audio play blocked by browser');
      });
      isPlaying = true;
    }
  });

  paper.addEventListener('mousemove', (e) => drag(e, paper));
  paper.addEventListener('mouseup', () => stopDrag(paper));
}

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

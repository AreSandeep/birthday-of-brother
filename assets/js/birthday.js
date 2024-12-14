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
  paper.style.cursor = 'default'; // Default cursor during animation

  setTimeout(() => {
    paper.style.opacity = '1';
    paper.style.transition = `all 3s ease-in-out ${index * 0.5}s`; // Staggered animation
    paper.style.left = `${10 + index * 15}%`; // Positioning across the screen
    paper.style.top = `${index % 2 === 0 ? '40%' : '60%'}`; // Alternate vertical position
  }, 500);

  // Enable double-click to activate dragging
  setTimeout(() => {
    enableDoubleClickToDrag(paper);
  }, 3500 + index * 500); // Wait for animation to finish
});

// Enable double-click to activate dragging
function enableDoubleClickToDrag(paper) {
  paper.addEventListener('dblclick', () => {
    paper.dataset.draggable = "true"; // Mark paper as draggable
    paper.style.cursor = 'grab'; // Change cursor to indicate draggable state

    // Play audio on first drag activation
    if (!isPlaying) {
      audio.play().catch(() => {
        console.log('Audio play blocked by browser');
      });
      isPlaying = true;
    }

    // Add drag events
    paper.addEventListener('mousedown', (e) => startDrag(e, paper));
    paper.addEventListener('mousemove', (e) => drag(e, paper));
    paper.addEventListener('mouseup', () => stopDrag(paper));
    paper.addEventListener('mouseleave', () => stopDrag(paper)); // Stop dragging if the mouse leaves
  });
}

function startDrag(e, paper) {
  if (paper.dataset.draggable === "true") {
    paper.dataset.dragging = "true";
    paper.style.zIndex = zIndex++;
    paper.dataset.offsetX = e.clientX - paper.offsetLeft;
    paper.dataset.offsetY = e.clientY - paper.offsetTop;
    paper.style.cursor = 'grabbing'; // Change cursor to grabbing during drag
  }
}

function drag(e, paper) {
  if (paper.dataset.dragging === "true") {
    paper.style.left = `${e.clientX - paper.dataset.offsetX}px`;
    paper.style.top = `${e.clientY - paper.dataset.offsetY}px`;
  }
}

function stopDrag(paper) {
  paper.dataset.dragging = "false";
  if (paper.dataset.draggable === "true") {
    paper.style.cursor = 'grab'; // Revert cursor to grab after drag ends
  } else {
    paper.style.cursor = 'default';
  }
}

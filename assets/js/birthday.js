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

  // Enable dragging functionality after animation completes
  setTimeout(() => {
    enableDragging(paper); // Enable drag functionality for each paper
  }, 3500 + index * 500); // Wait for animation to finish
});

// Enable dragging functionality
function enableDragging(paper) {
  paper.style.position = 'absolute'; // Ensure absolute positioning for dragging
  paper.style.cursor = 'grab'; // Change cursor to indicate draggable state

  paper.addEventListener('mousedown', (e) => {
    startDrag(e, paper);

    // Play audio on first drag
    if (!isPlaying) {
      audio.play().catch(() => {
        console.log('Audio play blocked by browser');
      });
      isPlaying = true;
    }
  });

  paper.addEventListener('mousemove', (e) => drag(e, paper));
  paper.addEventListener('mouseup', () => stopDrag(paper));
  paper.addEventListener('mouseleave', () => stopDrag(paper)); // Stop dragging if the mouse leaves
}

function startDrag(e, paper) {
  paper.dataset.dragging = "true";
  paper.style.zIndex = zIndex++;
  paper.dataset.offsetX = e.clientX - paper.offsetLeft;
  paper.dataset.offsetY = e.clientY - paper.offsetTop;
  paper.style.cursor = 'grabbing'; // Change cursor to grabbing during drag
}

function drag(e, paper) {
  if (paper.dataset.dragging === "true") {
    paper.style.left = `${e.clientX - paper.dataset.offsetX}px`;
    paper.style.top = `${e.clientY - paper.dataset.offsetY}px`;
  }
}

function stopDrag(paper) {
  paper.dataset.dragging = "false";
  paper.style.cursor = 'grab'; // Revert cursor to grab after drag ends
}

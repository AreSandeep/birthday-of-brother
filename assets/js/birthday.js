// Original Audio Controls
const audio = document.getElementById('background-music');
const audioButton = document.getElementById('audio-button');

audioButton.style.display = 'block'; // Make the button visible
let isPlaying = false; // Track audio state

audioButton.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    audioButton.textContent = 'Play Audio 🎵';
  } else {
    audio.play().catch(() => {
      console.log('Audio play blocked by browser');
    });
    audioButton.textContent = 'Pause Audio ⏸️';
  }
  isPlaying = !isPlaying;
});

audio.addEventListener('play', () => {
  isPlaying = true;
  audioButton.textContent = 'Pause Audio ⏸️';
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  audioButton.textContent = 'Play Audio 🎵';
});

// Dragging functionality
const papers = document.querySelectorAll('.paper');
let zIndex = 1;

// Toggle for manual drag
const enableDragButton = document.createElement('button');
enableDragButton.textContent = 'Enable Manual Drag';
document.body.appendChild(enableDragButton);
let isManualDragEnabled = false;

// Toggle drag mode
enableDragButton.addEventListener('click', () => {
  isManualDragEnabled = !isManualDragEnabled;
  enableDragButton.textContent = isManualDragEnabled ? 'Disable Manual Drag' : 'Enable Manual Drag';
});

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
  paper.addEventListener('mousedown', (e) => {
    if (isManualDragEnabled) startDrag(e, paper);
  });
  paper.addEventListener('mousemove', (e) => {
    if (isManualDragEnabled) drag(e, paper);
  });
  paper.addEventListener('mouseup', () => {
    if (isManualDragEnabled) stopDrag(paper);
  });
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

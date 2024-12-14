const audio = document.getElementById('background-music');
let isPlaying = false; // Track audio state

// Dragging functionality
const papers = document.querySelectorAll('.paper');
let zIndex = 1;

// Class for handling paper drag
class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchMoveX = 0;
    this.touchMoveY = 0;
    this.prevTouchX = 0;
    this.prevTouchY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.init();
  }

  init() {
    this.paper.addEventListener('mousedown', (e) => this.startDrag(e));
    this.paper.addEventListener('mousemove', (e) => this.moveDrag(e));
    this.paper.addEventListener('mouseup', () => this.endDrag());
    this.paper.addEventListener('mouseleave', () => this.endDrag());

    this.paper.addEventListener('touchstart', (e) => this.startDrag(e));
    this.paper.addEventListener('touchmove', (e) => this.moveDrag(e));
    this.paper.addEventListener('touchend', () => this.endDrag());
  }

  startDrag(e) {
    e.preventDefault();
    this.holdingPaper = true;
    this.paper.style.zIndex = zIndex++;
    if (e.type === "touchstart") {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    } else {
      this.touchStartX = e.clientX;
      this.touchStartY = e.clientY;
    }
    this.prevTouchX = this.touchStartX;
    this.prevTouchY = this.touchStartY;

    // Play audio if not already playing
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
      }).catch(() => {
        console.log('Audio play blocked by browser');
      });
    }
  }

  moveDrag(e) {
    if (!this.holdingPaper) return;

    e.preventDefault();

    if (e.type === "touchmove") {
      this.touchMoveX = e.touches[0].clientX;
      this.touchMoveY = e.touches[0].clientY;
    } else {
      this.touchMoveX = e.clientX;
      this.touchMoveY = e.clientY;
    }

    this.velX = this.touchMoveX - this.prevTouchX;
    this.velY = this.touchMoveY - this.prevTouchY;

    this.prevTouchX = this.touchMoveX;
    this.prevTouchY = this.touchMoveY;

    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
  }

  endDrag() {
    this.holdingPaper = false;
    checkIfAllImagesDragged();
  }
}

// Function to check if all images are dragged
let draggedImagesCount = 0;
function checkIfAllImagesDragged() {
  draggedImagesCount++;
  const papers = document.querySelectorAll('.paper');
  if (draggedImagesCount === papers.length) {
    const birthdayBox = document.getElementById('birthday-box');
    birthdayBox.style.opacity = 1;
    birthdayBox.style.transform = 'scale(1)';
  }
}

// Initialize auto-drag animation and dragging functionality
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

  // Initialize dragging functionality after animation completes
  setTimeout(() => {
    new Paper(paper); // Attach Paper drag handler
    paper.style.cursor = 'grab'; // Set cursor to indicate drag availability
  }, 3500 + index * 500); // Wait for animation to finish
});

// Delay the appearance of the drag instruction
setTimeout(function () {
  const dragInstruction = document.getElementById('drag-instruction');
  dragInstruction.style.opacity = 1;
}, 1000);

// Audio button functionality
const audioButton = document.getElementById('audio-button');
audioButton.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play().then(() => {
      isPlaying = true;
      audioButton.textContent = "PLAY SONG";
    }).catch(() => {
      console.log('Audio play blocked by browser');
    });
  } else {
    audio.pause();
    isPlaying = false;
    audioButton.textContent = "PLAY SONG";
  }
});

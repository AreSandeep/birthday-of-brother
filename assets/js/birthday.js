// Auto-dragging each paper from the left edge of the page
const papers = document.querySelectorAll('.paper');
let highestZ = 1;

// Auto-dragging each paper from left to right
papers.forEach((paper, index) => {
  setTimeout(() => {
    paper.style.transform = `translate(${(-window.innerWidth / 2) + (index * 300)}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 30 - 15}deg)`;
    paper.style.zIndex = highestZ++;
    paper.style.opacity = 1;

    // Settle papers from left to right
    setTimeout(() => {
      const settleX = 150 + index * 250; // Space between images
      const settleY = window.innerHeight - 300; // Position for images to settle
      paper.style.transform = `translate(${settleX}px, ${settleY}px) rotate(0deg)`;
    }, 3000);
  }, index * 1000); // Stagger animations
});

// Automatically play audio when page loads
const audio = document.getElementById('background-music');
audio.play();

// Ensure audio plays automatically
audio.oncanplaythrough = function () {
  audio.play();
};

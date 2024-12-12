// Auto-dragging functionality
const papers = document.querySelectorAll('.paper');
let highestZ = 1;

// Auto-dragging each paper
papers.forEach((paper, index) => {
  setTimeout(() => {
    paper.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 30 - 15}deg)`;
    paper.style.zIndex = highestZ++;
    paper.style.opacity = 1;

    // Settle papers from left to right after auto-dragging
    setTimeout(() => {
      const settleX = 100 + index * 160; // Space between images
      const settleY = window.innerHeight - 200; // Bottom position
      paper.style.transform = `translate(${settleX}px, ${settleY}px) rotate(0deg)`;
    }, 3000);
  }, index * 1000); // Stagger animations
});

// Auto-play the audio as soon as the page is loaded
const audio = document.getElementById('background-music');

audio.autoplay = true;
audio.load();

// Check if the audio is playing
audio.oncanplaythrough = function() {
  console.log('Audio is playing');
};

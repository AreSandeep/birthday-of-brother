// Auto-dragging functionality
const papers = document.querySelectorAll('.paper');
let highestZ = 1;

// Auto-dragging each paper
papers.forEach((paper, index) => {
  setTimeout(() => {
    // Start drag animation from the left of the page
    const startX = -200; // Start completely off the left
    const startY = Math.random() * (window.innerHeight - 200); // Random vertical position
    paper.style.transform = `translate(${startX}px, ${startY}px) rotate(${Math.random() * 30 - 15}deg)`;
    paper.style.zIndex = highestZ++;
    paper.style.opacity = 1;

    // Settle papers evenly from left to right
    setTimeout(() => {
      const pageWidth = window.innerWidth;
      const settleX = (pageWidth / (papers.length + 1)) * (index + 1) - 100; // Calculate even spacing
      const settleY = window.innerHeight / 2 - 100; // Center vertically
      paper.style.transform = `translate(${settleX}px, ${settleY}px) rotate(0deg)`;
    }, 3000);
  }, index * 1000); // Stagger animations
});

// Automatically play audio when the page opens
const audio = document.getElementById('background-music');
audio.volume = 1; // Ensure maximum volume
audio.play().catch((error) => {
  console.error('Audio autoplay issue:', error);
});

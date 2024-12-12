// Audio plays automatically when the page loads
const audio = document.getElementById('background-music');
audio.play();

// Auto-dragging each paper from the left to right
const papers = document.querySelectorAll('.paper');
let highestZ = 1;

// Auto-dragging each paper
papers.forEach((paper, index) => {
  setTimeout(() => {
    // Dragging images from the left to right
    paper.style.transform = `translate(${(index * 160)}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 30 - 15}deg)`;
    paper.style.zIndex = highestZ++;
    paper.style.opacity = 1;

    // Settle papers in a row from left to right after dragging
    setTimeout(() => {
      const settleY = window.innerHeight / 2 - 100; // Middle position vertically
      paper.style.transform = `translate(${index * 160}px, ${settleY}px) rotate(0deg)`;
    }, 3000);
  }, index * 1000); // Stagger animations
});

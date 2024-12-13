// Auto-animate papers
const papers = document.querySelectorAll('.paper');
let zIndex = 1;

// Animate each paper
papers.forEach((paper, index) => {
  setTimeout(() => {
    // Move papers from leftmost to rightmost
    paper.style.transform = `translateX(${index * 130}px)`; // Adjusted spacing for smaller cards
    paper.style.opacity = 1;
    paper.style.zIndex = zIndex++;

    // After animation, settle the card
    setTimeout(() => {
      paper.style.transform = `translateX(${index * 130}px) translateY(-10px)`;
    }, 3000);
  }, index * 1000); // Staggered animation
});

// Play background audio automatically
const audio = document.getElementById('background-music');
audio.play().catch((error) => {
  console.error("Audio autoplay failed:", error);
});

// Auto-animate papers
const papers = document.querySelectorAll('.paper');
let zIndex = 1;

// Animate each paper
papers.forEach((paper, index) => {
  setTimeout(() => {
    paper.style.transform = `translateX(${index * 250}px)`;
    paper.style.opacity = 1;
    paper.style.zIndex = zIndex++;

    // After animation, place it neatly on the screen
    setTimeout(() => {
      paper.style.transform = `translateX(${index * 250}px) translateY(-20px)`;
    }, 3000);
  }, index * 1000); // Staggered animation
});

// Background audio handling
const audio = document.getElementById('background-music');

// Ensure audio autoplay works
audio.play().catch(() => {
  console.log('Autoplay prevented; show play button if needed');
});

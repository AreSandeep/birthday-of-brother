// Auto-animate papers
const papers = document.querySelectorAll('.paper');
let zIndex = 1;

// Animate each paper
papers.forEach((paper, index) => {
  setTimeout(() => {
    paper.style.transform = `translateX(${index * 180}px)`; // Reduced spacing
    paper.style.opacity = 1;
    paper.style.zIndex = zIndex++;

    // After animation, place it neatly on the screen
    setTimeout(() => {
      paper.style.transform = `translateX(${index * 180}px) translateY(-20px)`; // Reduced spacing
    }, 3000);
  }, index * 1000); // Staggered animation
});

// Background audio handling
const audio = document.getElementById('background-music');
const playButton = document.getElementById('play-audio');

// Try to autoplay audio
audio.play().catch(() => {
  // If autoplay fails, show the play button
  playButton.style.display = 'block';
});

// Play audio on button click
playButton.addEventListener('click', () => {
  audio.play();
  playButton.style.display = 'none'; // Hide play button after audio starts
});

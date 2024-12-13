document.addEventListener('DOMContentLoaded', () => {
  const papers = document.querySelectorAll('.paper');
  const audio = document.getElementById('background-music');
  const playButton = document.getElementById('play-audio');
  let zIndex = 1;

  // Animate cards sliding in
  papers.forEach((paper, index) => {
    setTimeout(() => {
      paper.style.transform = `translate(${index * 100}px, 0) rotate(0deg)`;
      paper.style.opacity = '1';
      paper.style.zIndex = zIndex++;
    }, index * 500); // Stagger animation
  });

  // Play music on mobile click
  playButton.addEventListener('click', () => {
    audio.play();
    playButton.style.display = 'none'; // Hide button after playing
  });

  // Handle card clicks for custom actions
  papers.forEach(paper => {
    paper.addEventListener('click', () => {
      paper.style.transform = `scale(1.1) rotate(-5deg)`;
      setTimeout(() => {
        paper.style.transform = `scale(1) rotate(0deg)`;
      }, 300);
    });
  });
});

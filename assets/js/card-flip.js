document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.flip-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('flipped');
      
      setTimeout(() => {
        card.classList.remove('flipped');
      }, 550);
    });
  });
});
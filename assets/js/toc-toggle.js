document.addEventListener('DOMContentLoaded', function() {
  const toggleButtons = document.querySelectorAll('.toc-toggle');
  
  // Add SVG icons as strings
  const minusSVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" />
  </svg>`;
  
  const plusSVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
  </svg>`;

  toggleButtons.forEach(button => {
    // Set initial state
    const content = button.closest('.toc-section').querySelector('.toc-content');
    const isHidden = content.classList.contains('hidden');
    button.innerHTML = isHidden ? plusSVG : minusSVG;
    
    button.addEventListener('click', function(event) {
      // Get current section
      const currentSection = this.closest('.toc-section');
      const currentContent = currentSection.querySelector('.toc-content');
      
      // Hide all OTHER sections
      document.querySelectorAll('.toc-section').forEach(section => {
        if (section !== currentSection) {  // Skip current section
          const content = section.querySelector('.toc-content');
          const toggle = section.querySelector('.toc-toggle');
          if (content && toggle) {
            content.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = plusSVG; // Show plus when collapsed
          }
        }
      });
      
      // Toggle current section
      if (currentContent) {
        const isExpanded = currentContent.classList.contains('hidden');
        currentContent.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !isExpanded);
        // Update icon based on state - plus when hidden, minus when shown
        this.innerHTML = isExpanded ? minusSVG : plusSVG;
      }
    });
  });
}); 
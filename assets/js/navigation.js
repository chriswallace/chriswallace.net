document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const menuClose = document.getElementById("menu-close");
  const navigationList = document.getElementById("navigation-items");

  // Toggle menu on hamburger button click
  menuButton.addEventListener("click", () => {
    document.body.classList.toggle("open-menu");
    const isOpen = document.body.classList.contains("open-menu");
    menuButton.setAttribute("aria-expanded", isOpen);
  });

  // Close menu on close button click
  menuClose.addEventListener("click", () => {
    document.body.classList.remove("open-menu");
    menuButton.setAttribute("aria-expanded", "false");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    // Check if the clicked element is not the menu button, close button, or inside the navigation
    if (
      !menuButton.contains(event.target) &&
      !navigationList.contains(event.target)
    ) {
      // Close the menu if it's open
      if (document.body.classList.contains("open-menu")) {
        document.body.classList.remove("open-menu");
        menuButton.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      document.body.classList.contains("open-menu")
    ) {
      document.body.classList.remove("open-menu");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.focus(); // Return focus to menu button
    }
  });
});

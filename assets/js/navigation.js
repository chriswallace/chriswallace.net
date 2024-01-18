document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const navigationList = document.getElementById("navigation-items");

  // Toggle menu on button click
  menuButton.addEventListener("click", () => {
    document.body.classList.toggle("open-menu");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    // Check if the clicked element is not the menu button or a child of the navigation list
    if (
      !menuButton.contains(event.target) &&
      !navigationList.contains(event.target)
    ) {
      // Close the menu if it's open
      if (document.body.classList.contains("open-menu")) {
        document.body.classList.remove("open-menu");
      }
    }
  });
});

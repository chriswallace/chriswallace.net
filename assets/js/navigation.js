document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById('menu-button');
    const navigationList = document.getElementById('navigation-items');
    menuButton.addEventListener("click", () => {
        document.body.classList.toggle("open-menu");
    });
});
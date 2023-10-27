document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById('menu-button');
    const navigationList = document.getElementById('navigation-items');
    menuButton.addEventListener("click", () => {
        navigationList.classList.toggle("invis");
        document.body.classList.toggle("no-scroll");
    });
    const closeButton = document.getElementById('close-button');
    closeButton.addEventListener("click", () => {
        navigationList.classList.toggle("invis");
        document.body.classList.toggle("no-scroll");
    });
});
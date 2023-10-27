document.addEventListener('DOMContentLoaded', () => {
    const bgSwitch = document.getElementById('bgSwitch');
    const triggerPoint = bgSwitch.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            document.body.classList.remove('subtle-bg');
        } else if (window.scrollY + 140 >= triggerPoint) {
            document.body.classList.add('subtle-bg');
        } else {
            document.body.classList.remove('subtle-bg');
        }
    });
});
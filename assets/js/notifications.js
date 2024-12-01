document.addEventListener('DOMContentLoaded', () => {
  const notifsButton = document.getElementById('notifs');
  const notifications = document.querySelector('.notifications');
  const overlay = document.getElementById('notificationsOverlay');

  function toggleNotifications() {
    if (notifications.classList.contains('hidden')) {
      notifications.classList.add('flex');
      overlay.classList.remove('hidden');
      notifications.classList.remove('hidden');
      // Use setTimeout to ensure the initial hidden removal renders first
      setTimeout(() => {
        overlay.classList.add('opacity-100','backdrop-blur-sm');
        notifications.classList.remove('-translate-y-2', 'opacity-0');
      }, 10);
    } else {
      notifications.classList.add('-translate-y-2', 'opacity-0');
      // Wait for animations to complete before hiding
      setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.classList.remove('backdrop-blur-sm');
        notifications.classList.remove('flex');
        notifications.classList.add('hidden');
      }, 200);
    }
  }

  // Event Listeners
  notifsButton.addEventListener('click', toggleNotifications);
  overlay.addEventListener('click', toggleNotifications);
});
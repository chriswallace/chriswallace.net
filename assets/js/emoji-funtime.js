document.addEventListener("DOMContentLoaded", () => {
    const socket = io.connect('https://cursortrack-026f30916f71.herokuapp.com');
    const cursors = {};
    const emojiPicker = document.querySelector('emoji-picker');

    // Load previously selected emoji from localStorage, or default to 😀
    let currentEmoji = localStorage.getItem('emoji') || "😀";

    // Update the emoji picker with the current emoji
    emojiPicker.emoji = currentEmoji;

    // Listen for the emoji picker's emoji selection event
    emojiPicker.addEventListener('emoji-click', (event) => {
        currentEmoji = event.detail.unicode;
        localStorage.setItem('emoji', currentEmoji);  // Save the selected emoji to localStorage
        socket.emit('emojiUpdate', { emoji: currentEmoji });  // Send the selected emoji to the server
    });

    // Function to handle emoji selection by user
    function onEmojiSelected(newEmoji) {
        currentEmoji = newEmoji;
        socket.emit('emojiUpdate', { emoji: newEmoji });
    }
    function updateCursorEmoji(userId, newEmoji) {
        const cursor = cursors[userId];
        if (cursor) {
            cursor.innerText = newEmoji;
        }
    }

    // Update cursor emoji when receiving an update from the server
    socket.on('emojiUpdate', (data) => {
        const { userId, emoji } = data;
        updateCursorEmoji(userId, emoji);  // Assume you have a function to update the emoji for a cursor
    });


    function onCursorPositionChanged(event) {
        const normalizedX = event.clientX / window.innerWidth;
        const pageY = event.clientY + window.scrollY;  // Add scrollY to clientY to get pageY
        // Send normalized X and absolute Y position to the server
        socket.emit('cursorMove', {
            x: normalizedX,
            y: pageY,
            emoji: currentEmoji
        });
    }

    socket.on('cursorMove', (data) => {
        const absoluteX = data.x * window.innerWidth;
        const absoluteY = data.y;  // Subtract scrollY from received Y to get clientY
        let cursor = cursors[data.userId];
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.classList.add('emojiCursor');
            cursor.innerText = data.emoji;
            document.body.appendChild(cursor);
            cursors[data.userId] = cursor;
        }
        cursor.style.left = absoluteX + 'px';
        cursor.style.top = absoluteY + 'px';
    });

    socket.on('cursorLeave', (data) => {
        const cursor = cursors[data.id];
        if (cursor) {
            cursor.remove();
            delete cursors[data.id];
        }
    });

    document.addEventListener('mousemove', onCursorPositionChanged);

    // Function to notify server of page change
    function onPageChange() {
        const page = window.location.pathname;  // Get current page path
        socket.emit('pageChange', { page });
    }

    // Call onPageChange on initial load and whenever the user navigates to a new page
    onPageChange();
});
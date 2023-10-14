<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {% seo title=true %}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=Gabarito:wght@400;700&display=swap" rel="stylesheet">   <link rel="stylesheet" href="/assets/main.css?version=1.72" />
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.png" />
  <meta property="og:image" content="{{page.thumbnail | default: '/assets/images/chris-wallace.jpg'}}" />
  <meta property="twitter:image" content="{{page.thumbnail | default: '/assets/images/chris-wallace.jpg'}}">
<script type="module">
import 'https://cdn.skypack.dev/emoji-picker-element';
</script>
<script>
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

    setInterval(() => {
      console.log(cursors);
    }, 3000);

    document.addEventListener('mousemove', onCursorPositionChanged);

    // Function to notify server of page change
    function onPageChange() {
        const page = window.location.pathname;  // Get current page path
        socket.emit('pageChange', { page });
    }

    // Call onPageChange on initial load and whenever the user navigates to a new page
    onPageChange();
  });
</script>

{% seo title=false %}

  <style>
  .fade-in-element,
  .art-collection .image-wrapper,
  .art-collection h3,
  .art-collection h4 {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-in-element.visible,
  .art-collection .image-wrapper.visible,
  .art-collection h3.visible,
  .art-collection h4.visible {
      opacity: 1;
      transform: translateY(0);
  }
  </style>
</head>

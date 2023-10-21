document.addEventListener("DOMContentLoaded", () => {
    const socket = io.connect('https://cursortrack-026f30916f71.herokuapp.com');
    const cursors = {};
    const emojiPicker = document.querySelector('emoji-picker');
    const chatIcon = document.getElementById('chat-icon');
    const chatContainer = document.getElementById('chat-container');
    const chatInput = document.getElementById('chat-input');
    const messages = document.getElementById('messages');
    const hiddenDiv = document.getElementById('hidden-div');

    let currentEmoji = localStorage.getItem('emoji') || "😀";
    // Retrieve chat state
    isChatEnabled = JSON.parse(localStorage.getItem('chatEnabled')) || false;
    chatContainer.classList.toggle('hidden', !isChatEnabled);
    chatIcon.classList.toggle('active', isChatEnabled);

    emojiPicker.emoji = currentEmoji;

    hiddenDiv.textContent = chatInput.value;
    chatInput.style.width = hiddenDiv.offsetWidth + 2 + "px";

    emojiPicker.addEventListener('emoji-click', (event) => {
        currentEmoji = event.detail.unicode;
        localStorage.setItem('emoji', currentEmoji);
        socket.emit('emojiUpdate', { emoji: currentEmoji });
    });

    chatIcon.addEventListener('click', toggleChat);

    chatInput.addEventListener('input', () => {
        chatContainer.classList.toggle('orange-bg', chatInput.value.length >= 40);
        // Replace spaces with &nbsp;
        hiddenDiv.innerHTML = chatInput.value.replace(/ /g, '&nbsp;');
        chatInput.style.width = hiddenDiv.offsetWidth + "px";
        updateChatText();
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            disableChat(e);
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage(chatInput.value);
            chatInput.value = '';
            chatContainer.classList.toggle('orange-bg', chatInput.value.length >= 40);
        }
    });

    document.addEventListener('mousemove', onCursorPositionChanged);

    document.addEventListener('click', (event) => {
        const { target } = event;

        // List of tag names that should not trigger chat focus
        const noFocusTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];

        if (!noFocusTags.includes(target.tagName) && isChatEnabled) {
            chatInput.focus();
        }
    });

    // Extract the logic into a separate function
    function updateChatContainerPosition(clientX, pageY) {
        let chatContainerLeft = clientX + 18;
        const chatContainerRight = chatContainerLeft + chatContainer.offsetWidth;

        // Check if chat-container will be off the right side of the viewport
        if (chatContainerRight > window.innerWidth - 18) {
            // Adjust chatContainerLeft to keep chat-container within viewport
            chatContainerLeft = window.innerWidth - chatContainer.offsetWidth - 18;  // 18 is a buffer value, adjust as necessary
        }

        chatContainer.style.left = chatContainerLeft + 'px';
        chatContainer.style.top = pageY - 3 + 'px';
    }

    // Modify this function to use updateChatContainerPosition
    function onCursorPositionChanged(event) {
        const normalizedX = event.clientX / window.innerWidth;
        const pageY = event.clientY + window.scrollY + 20;  // Add scrollY to clientY to get pageY

        // Update chat-container position
        updateChatContainerPosition(event.clientX, pageY);

        updateCursorPosition(normalizedX, pageY);
    }

    // Modify this function to use updateChatContainerPosition
    function toggleChat(e) {
        e.preventDefault();
        isChatEnabled = !isChatEnabled;
        chatContainer.classList.toggle('hidden', !isChatEnabled);
        chatIcon.classList.toggle('active', isChatEnabled);
        chatInput.focus();
        localStorage.setItem('chatEnabled', isChatEnabled);  // Store the chat state

        // Update chat-container position when toggled on
        if (isChatEnabled) {
            const clientRect = chatIcon.getBoundingClientRect();
            updateChatContainerPosition(clientRect.left, clientRect.top + window.scrollY + clientRect.height);
        }
    }

    function updateCursorPosition(normalizedX, pageY) {
        socket.emit('cursorMove', {
            x: normalizedX,
            y: pageY,
            emoji: currentEmoji,
            chatActive: !chatContainer.classList.contains('hidden'),
            chatMessage: chatInput.value
        });
    }

    function updateChatText() {
        const normalizedX = parseFloat(chatContainer.style.left) / window.innerWidth;
        const pageY = parseFloat(chatContainer.style.top) + 3;  // Adjust the posY to match the previous calculation
        updateCursorPosition(normalizedX, pageY);
    }

    function disableChat(e) {
        e.preventDefault();
        isChatEnabled = false;
        chatContainer.classList.add('hidden');
    }

    function sendMessage(message) {
        socket.emit('newMessage', { message });
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messages.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.classList.add('fade-out');
            setTimeout(() => {
                messageDiv.remove();
                // Replace spaces with &nbsp;
                hiddenDiv.innerHTML = chatInput.value.replace(/ /g, '&nbsp;');
                chatInput.style.width = hiddenDiv.offsetWidth + 2 + "px";
            }, 250);  // Match the duration of the CSS transition
        }, 3000);  // 3 seconds before starting the fade-out animation
    }

    socket.on('emojiUpdate', (data) => {
        const { userId, emoji } = data;
        updateCursorEmoji(userId, emoji);
    });

    socket.on('cursorMove', (data) => {
        const absoluteX = data.x * window.innerWidth;
        const absoluteY = data.y;
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
        handleChatBubble(cursor, data);
    });

    socket.on('cursorLeave', (data) => {
        const cursor = cursors[data.id];
        if (cursor) {
            cursor.remove();
            delete cursors[data.id];
        }
    });

    function updateCursorEmoji(userId, newEmoji) {
        const cursor = cursors[userId];
        if (cursor) {
            cursor.innerText = newEmoji;
        }
    }

    function handleChatBubble(cursor, data) {
        if (socket.id !== data.userId) {
            let chatBubble = cursor.querySelector('.speech-bubble');
            if (!chatBubble) {
                chatBubble = document.createElement('div');
                chatBubble.classList.add('speech-bubble');
                cursor.appendChild(chatBubble);
            }
            if (data.chatMessage && data.chatMessage.trim() !== '') {
                chatBubble.innerText = data.chatMessage;  // This line sets the text of the chat bubble for other clients
                chatBubble.style.display = 'block';
            } else {
                chatBubble.style.display = 'none';  // Hide the bubble if there is no text
            }
        } else {
            const chatBubble = cursor.querySelector('.speech-bubble');
            if (chatBubble) {
                chatBubble.style.display = 'none';
            }
        }
    }


    function onPageChange() {
        const page = window.location.pathname;
        socket.emit('pageChange', { page });
    }

    onPageChange();
});
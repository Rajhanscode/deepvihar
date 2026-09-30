document.addEventListener("DOMContentLoaded", function () {
    const chatSendBtn = document.getElementById('ai-chat-send-btn');
    const chatInput = document.getElementById('ai-chat-input');
    const chatMessages = document.getElementById('ai-chat-messages');

    // Function to append a message to the chat screen
    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
        } else {
            messageDiv.classList.add('ai-message');
        }
        
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        
        // Auto-scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle sending message
    function handleSendMessage() {
        const userText = chatInput.value.trim();
        if (userText === '') return;

        // 1. Show user message
        appendMessage(userText, 'user');
        chatInput.value = '';

        // 2. Show a temporary "Thinking..." message
        const thinkingId = 'thinking-' + Date.now();
        const thinkingDiv = document.createElement('div');
        thinkingDiv.classList.add('chat-message', 'ai-message');
        thinkingDiv.setAttribute('id', thinkingId);
        thinkingDiv.textContent = 'Thinking...';
        chatMessages.appendChild(thinkingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 3. Placeholder for API Call
        setTimeout(() => {
            const thinkingElement = document.getElementById(thinkingId);
            if (thinkingElement) {
                thinkingElement.remove();
            }
            appendMessage("This is a placeholder AI response. The backend API connection will be added soon.", 'ai');
        }, 1500);
    }

    // Event listeners for send button and Enter key
    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', handleSendMessage);

        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
});
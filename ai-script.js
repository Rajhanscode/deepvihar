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
            messageDiv.textContent = text;
        } else {
            messageDiv.classList.add('ai-message');
            // Use marked.js for Markdown and MathJax for LaTeX rendering
            if (typeof marked !== 'undefined') {
                messageDiv.innerHTML = marked.parse(text);
                // Trigger MathJax typesetting if available
                if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
                    MathJax.typesetPromise([messageDiv]).catch(function (err) {
                        console.error("MathJax error: ", err);
                    });
                }
            } else {
                messageDiv.textContent = text;
            }
        }
        
        chatMessages.appendChild(messageDiv);
        
        // Auto-scroll to the bottom when a new message arrives
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Main logic to handle sending messages
    async function handleSendMessage() {
        const userText = chatInput.value.trim();
        if (userText === '') return;

        // 1. Display user message
        appendMessage(userText, 'user');
        chatInput.value = '';

        // 2. Show "Thinking..." animation
        const thinkingId = 'thinking-' + Date.now();
        const thinkingDiv = document.createElement('div');
        thinkingDiv.classList.add('chat-message', 'ai-message');
        thinkingDiv.setAttribute('id', thinkingId);
        thinkingDiv.textContent = 'Thinking...';
        chatMessages.appendChild(thinkingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // 3. Send message to the remote Python Backend server
            const response = await fetch('https://deepvihar.pythonanywhere.com/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userText })
            });

            const data = await response.json();
            
            // Remove "Thinking..." message
            const thinkingElement = document.getElementById(thinkingId);
            if (thinkingElement) thinkingElement.remove();

            // 4. Display the actual AI response or exact backend error
            if (data.reply) {
                appendMessage(data.reply, 'ai');
            } else if (data.error) {
                appendMessage("Backend Error: " + data.error, 'ai');
            } else {
                appendMessage("Sorry, I encountered an unknown error.", 'ai');
            }
        } catch (error) {
            // Handle server offline or connection errors
            const thinkingElement = document.getElementById(thinkingId);
            if (thinkingElement) thinkingElement.remove();
            appendMessage("Error connecting to AI. Please try again later.", 'ai');
        }
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
function sendMessage() {
    const messageInput = document.getElementById('message');
    const chatBox = document.getElementById('chat-box');
    const userMessage = messageInput.value.trim();
    
    if (userMessage === '') return;

    // Display user's message
    const userMsgElem = document.createElement('div');
    userMsgElem.className = 'user-message';
    userMsgElem.textContent = userMessage;
    chatBox.appendChild(userMsgElem);
    messageInput.value = '';

    // Scroll down automatically
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send to backend
    fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: userMessage
    })
    .then(response => response.text())
    .then(botReply => {
        const botMsgElem = document.createElement('div');
        botMsgElem.className = 'bot-message';
        botMsgElem.textContent = botReply;
        chatBox.appendChild(botMsgElem);

        // Auto scroll after response
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => console.error('Error:', error));
}

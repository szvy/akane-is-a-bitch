const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

const apiKey = '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';

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    chatContainer.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    userInput.value = '';

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768",
                messages: [
                    { role: "system", content: "You are a helpful AI assistant. You were made by Szvy. You (specifically) are the 'Szvy Central AI' aka the SCAI. Also, make sure to sound simple and human. Do NOT specifcally just be szvy central. Be like just a general AI that calls yourself the Szvy Central AI or SCAI, but don't constantly say it." },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.9,
                max_tokens: 1024,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let aiResponse = data.choices[0].message.content;

        chatContainer.innerHTML += `<p><strong>SCAI:</strong> ${aiResponse}</p>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        chatContainer.innerHTML += `<p><strong>Error:</strong> Failed to get AI response. Error details: ${error.message}</p>`;
    }
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function appendMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `<p>${text}</p>`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

console.log(`
    /$$$$$$$ /$$$$$$$$ /$$    /$$ /$$   /$$
   /$$_____/|____ /$$/|  $$  /$$/| $$  | $$
  |  $$$$$$    /$$$$/  \\  $$/$$/ | $$  | $$
   \\____  $$  /$$__/    \\  $$$/  | $$  | $$
   /$$$$$$$/ /$$$$$$$$   \\  $/   |  $$$$$$$
  |_______/ |________/    \\_/     \\____  $$
                                  /$$  | $$
                                 |  $$$$$$/
                                  \\______/
  `);
  
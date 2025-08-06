const themeToggle = document.getElementById('theme-toggle');
const fontSizeRange = document.getElementById('font-size');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');

const QA = {
    'hola': 'Hola! ¿Cómo puedo ayudarte?',
    'precio': 'Los precios varían según el servicio.',
    'gracias': '¡De nada!'
};

function appendMessage(author, text) {
    const p = document.createElement('p');
    p.textContent = `${author}: ${text}`;
    chatLog.appendChild(p);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function saveHistory() {
    localStorage.setItem('chatHistory', chatLog.innerHTML);
}

function loadHistory() {
    const data = localStorage.getItem('chatHistory');
    if (data) {
        chatLog.innerHTML = data;
    }
}

themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
});

fontSizeRange.addEventListener('input', () => {
    document.documentElement.style.setProperty('--font-size', fontSizeRange.value + 'px');
});

chatbotToggle.addEventListener('click', () => {
    chatbot.hidden = !chatbot.hidden;
});

sendChat.addEventListener('click', () => {
    const msg = chatInput.value.trim().toLowerCase();
    if (!msg) return;
    appendMessage('Tú', msg);
    chatInput.value = '';
    appendMessage('Bot', 'Escribiendo...');
    setTimeout(() => {
        const response = QA[msg] || 'Lo siento, no entiendo tu pregunta.';
        chatLog.lastChild.textContent = `Bot: ${response}`;
        saveHistory();
    }, 500);
});

chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendChat.click();
    }
});

loadHistory();

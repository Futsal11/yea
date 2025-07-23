// AOS init
document.addEventListener('DOMContentLoaded', () => {
  AOS.init();

  // Load chat history
  const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
  const messages = document.getElementById('chatbot-messages');
  history.forEach(m => messages.innerHTML += m);
  messages.scrollTop = messages.scrollHeight;
});

// WhatsApp form
document.getElementById('formulario-whatsapp').addEventListener('submit', e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const ciudad = document.getElementById('ciudad').value;
  const celular = document.getElementById('celular').value;
  const seguro = document.getElementById('seguro').value;
  const mensajeExtra = document.getElementById('mensaje').value;
  const mensaje = `Hola, mi nombre es ${nombre}, soy de ${ciudad}, mi celular es ${celular}, quiero información sobre el seguro de: ${seguro}. ${mensajeExtra}`;
  const url = `https://wa.me/573168609126?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
  document.getElementById('formulario-whatsapp').classList.add('hidden');
  document.getElementById('mensaje-final').classList.remove('hidden');
});

// Chatbot
const respuestas = {
  soat: 'El SOAT es el seguro obligatorio para vehículos en Colombia. Expedimos tu SOAT al instante.',
  'todo riesgo': 'El seguro Todo Riesgo cubre daños a tu vehículo, terceros y robo. Solicita tu cotización.',
  vida: 'El seguro de Vida protege a tu familia en caso de fallecimiento y ofrece respaldo financiero.',
  salud: 'El seguro de Salud cubre gastos médicos y hospitalarios. Tenemos planes para ti y tu familia.',
  hogar: 'El seguro de Hogar protege tu vivienda contra incendios, robos y desastres naturales.',
  viajes: 'El seguro de Viajes te protege ante imprevistos médicos, pérdida de equipaje y cancelaciones.',
  empresarial: 'El seguro Empresarial protege tu negocio, empleados y activos ante riesgos diversos.',
  mascotas: 'El seguro para Mascotas cubre gastos veterinarios y responsabilidad civil.',
  accidentes: 'El seguro de Accidentes personales te respalda ante lesiones o incapacidad por accidentes.'
};

const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

chatbotBtn.addEventListener('click', () => {
  chatbotWindow.classList.toggle('hidden');
  if (!chatbotWindow.classList.contains('hidden') && chatbotMessages.innerHTML === '') {
    const welcome = '<div><b>Bot:</b> ¡Hola! ¿Sobre qué seguro necesitas información?</div>';
    chatbotMessages.innerHTML += welcome;
    localStorage.setItem('chatHistory', JSON.stringify([welcome]));
  }
});

function appendMessage(html) {
  chatbotMessages.innerHTML += html;
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
  history.push(html);
  localStorage.setItem('chatHistory', JSON.stringify(history));
}

chatbotSend.addEventListener('click', () => {
  const pregunta = chatbotInput.value.trim();
  if (!pregunta) return;
  appendMessage(`<div><b>Tú:</b> ${pregunta}</div>`);
  chatbotInput.value = '';
  appendMessage('<div id="typing">Bot está escribiendo...</div>');
  setTimeout(() => {
    document.getElementById('typing').remove();
    const lower = pregunta.toLowerCase();
    const key = Object.keys(respuestas).find(k => lower.includes(k));
    let resp = respuestas[key] || 'No entendí tu pregunta. ¿Puedes especificar el tipo de seguro?';
    resp += ' <br><a href="https://wa.me/573168609126" target="_blank" class="text-green-600 underline">Más información aquí</a>';
    appendMessage(`<div><b>Bot:</b> ${resp}</div>`);
  }, 600);
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const body = document.body;
  const current = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', current);
  themeToggle.textContent = current === 'dark' ? '☀️' : '🌙';
});

// Font size controls
let fontSize = 16;
const inc = document.getElementById('font-increase');
const dec = document.getElementById('font-decrease');
inc.addEventListener('click', () => {
  fontSize += 1;
  document.documentElement.style.fontSize = fontSize + 'px';
});
dec.addEventListener('click', () => {
  fontSize = Math.max(12, fontSize - 1);
  document.documentElement.style.fontSize = fontSize + 'px';
});

const form = document.getElementById('quote-form');
const msg = document.getElementById('msg');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.success) {
      msg.textContent = 'Cotización enviada. ¡Gracias!';
      form.reset();
    } else {
      msg.textContent = 'Error al enviar. Inténtalo de nuevo.';
      msg.style.color = 'red';
    }
  });
}

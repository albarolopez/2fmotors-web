const form = document.getElementById('appointmentForm');
const feedback = document.getElementById('formFeedback');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const get = key => (data.get(key) || '').toString().trim();
  const message = [
    'Hola, 2F MOTORS. Quiero solicitar una cita para mi vehículo.',
    '',
    `Nombre: ${get('nombre')}`,
    `Teléfono: ${get('telefono')}`,
    `Marca: ${get('marca')}`,
    `Modelo: ${get('modelo')}`,
    `Año: ${get('anio') || 'No indicado'}`,
'',
    'Problema que presenta el coche:',
    get('problema'),
    '',
    'Entiendo que la cita queda pendiente de confirmación.'
  ].join('\n');
  feedback.textContent = 'Abriendo WhatsApp. Revisa los datos y pulsa Enviar para completar la solicitud.';
  const whatsappUrl = `https://wa.me/34687372411?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});


// Carrusel de servicios: muestra una tarjeta por vez en móvil y escritorio.
const serviceTrack = document.getElementById('serviceTrack');
if (serviceTrack) {
  const serviceCards = Array.from(serviceTrack.querySelectorAll('.service-card'));
  const serviceCounter = document.getElementById('serviceCounter');
  const serviceDots = Array.from(document.querySelectorAll('#serviceDots button'));
  let serviceIndex = 0;
  const renderService = () => {
    serviceTrack.style.transform = `translateX(-${serviceIndex * 100}%)`;
    serviceCounter.textContent = `${String(serviceIndex + 1).padStart(2, '0')} / ${String(serviceCards.length).padStart(2, '0')}`;
    serviceDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === serviceIndex);
      dot.setAttribute('aria-current', index === serviceIndex ? 'true' : 'false');
    });
    document.getElementById('servicePrev').disabled = serviceIndex === 0;
    document.getElementById('serviceNext').disabled = serviceIndex === serviceCards.length - 1;
  };
  document.getElementById('servicePrev').addEventListener('click', () => {
    if (serviceIndex > 0) { serviceIndex--; renderService(); }
  });
  document.getElementById('serviceNext').addEventListener('click', () => {
    if (serviceIndex < serviceCards.length - 1) { serviceIndex++; renderService(); }
  });
  serviceDots.forEach((dot, index) => dot.addEventListener('click', () => {
    serviceIndex = index; renderService();
  }));
  renderService();
}

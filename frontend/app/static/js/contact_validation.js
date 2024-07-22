// Validación con JavaScript
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  // Validar nombre
  if (name.length < 3 || name.length > 20) {
    nameInput.classList.add('is-invalid');
    document.getElementById('nameError').style.display = 'block';
    return;
  }

  // Validar correo electrónico
  if (!validateEmail(email)) {
    emailInput.classList.add('is-invalid');
    document.getElementById('emailError').style.display = 'block';
    return;
  }

  // Continuar con el envío del formulario si pasa las validaciones
  contactForm.submit();
});

// Validación con jQuery
$(document).ready(function() {
  $('#phone').on('keypress', function(event) {
    const keyCode = event.which;
    if (!(keyCode >= 48 && keyCode <= 57) && keyCode !== 45 && keyCode !== 32) {
      return false;
    }
  });
});

// Función para validar correo electrónico con expresión regular
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

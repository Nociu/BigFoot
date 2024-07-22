document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar todos los botones "Llevar carro"
  const addToCartButtons = document.querySelectorAll('.llevar-carro');

  // Agregar evento de clic a cada botón
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const productId = this.getAttribute('data-producto-id');
      addToCart(productId);
    });
  });

  // Función para agregar el producto al carrito
  function addToCart(productId) {
    fetch(`/agregar_al_carro/${productId}/`, {
      method: 'POST',
      body: JSON.stringify({ product_id: productId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Producto agregado al carrito!');
        // Aquí podrías actualizar el icono del carrito o hacer otras acciones
      } else {
        alert('Hubo un problema al agregar el producto al carrito');
      }
    })
    .catch(error => console.error('Error:', error));
  }

  // Función para obtener el token CSRF de las cookies (necesario para solicitudes POST en Django)
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  
});









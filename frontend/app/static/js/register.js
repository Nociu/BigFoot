document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

        const firstName = document.getElementById('nombres').value;
        const lastName = document.getElementById('apellidos').value;
        const email = document.getElementById('correo').value;
        const password = document.getElementById('contraseña').value;
        const passwordConfirm = document.getElementById('confirmar_contraseña').value;


       

        if (password !== passwordConfirm) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.(com|cl|net|org)$/i;
        if (!emailPattern.test(email)) {
            alert('El correo electrónico debe terminar en .com, .cl, .net, o .org');
            return;
        }


        try {
            


            const response = await fetch('http://localhost:9020/persona/', { 
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                //     'X-CSRFToken': getCookie('csrftoken')  // Añadir CSRF token
                // },
                body: JSON.stringify({
                    nombre: firstName,
                    apellido: lastName,
                    correo: email,
                    contraseña: password
                })
            });

            if (response.ok) {
                // Obtener el JSON de la respuesta
                const data = await response.json();

                // Mostrar un mensaje de éxito en la página
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Registro exitoso. Usuario registrado.';
                successMessage.style.color = 'green';
                form.appendChild(successMessage);

                // Limpiar los campos del formulario
                form.reset();

                // Guardar datos en el localStorage (opcional)
                localStorage.setItem('userData', JSON.stringify({
                    nombre: firstName,
                    apellido: lastName,
                    correo: email
                }));

                // Puedes redirigir a otra página si es necesario
                // window.location.href = '/some-other-page/';
            } else {
                const errorData = await response.json();
                alert(`Error en el registro: ${JSON.stringify(errorData.errors)}`);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            alert('Error al registrar. Inténtalo de nuevo más tarde.');
        }
    });

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

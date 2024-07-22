document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

    if (password !== passwordConfirm) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
        const response = await fetch('http://localhost:9020/persona/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Añadir CSRF token
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            })
        });

        if (response.ok) {
            alert('Registro exitoso');
            $('#registerModal').modal('hide'); // Cerrar el modal si el registro es exitoso
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

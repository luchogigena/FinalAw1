document.addEventListener('DOMContentLoaded', function() {
    const reservationData = JSON.parse(localStorage.getItem('reservationData'));

    if (!reservationData) {
        document.getElementById('reservation-summary').innerHTML = '<p>No se encontró información de la reserva.</p>';
        return;
    }

    // Mostrar el resumen de la reserva
    const summaryDiv = document.getElementById('reservation-summary');
    summaryDiv.innerHTML = `
        <h3>Ciudad: ${reservationData.city}</h3>
        <p>Precio del Hotel: $${reservationData.hotelPrice}</p>
        <p>Número de Días: ${reservationData.numDays}</p>
        <p>Número de Huéspedes: ${reservationData.numGuests}</p>
        <h4>Total: $${reservationData.totalPrice}</h4>
    `;

    // Manejar el envío del formulario
    document.getElementById('customer-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (name && email && phone) {
            // Aquí podrías hacer una solicitud a un servidor para guardar los datos
            alert('Reserva confirmada. Gracias por tu compra!');
            localStorage.removeItem('reservationData'); // Limpiar LocalStorage
            window.location.href = 'index.html'; // Volver al inicio
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    // Manejar el botón de cancelar
    document.getElementById('cancel-button').addEventListener('click', function() {
        localStorage.removeItem('reservationData'); // Limpiar LocalStorage
        window.location.href = 'index.html'; // Volver al inicio
    });
});

import { cities } from './cities.js';

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cities-container')) {
        renderCities();
    } else if (document.getElementById('city-name')) {
        renderCityDetails();
    }
});

function renderCities() {
    const container = document.getElementById('cities-container');
    cities.forEach(city => {
        const card = createCityCard(city);
        container.appendChild(card);
    });
}

function createCityCard(city) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 py-3 py-md-0';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    const img = document.createElement('img');
    img.src = city.img;
    img.alt = `Imagen de ${city.city}`;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const h3 = document.createElement('h3');
    h3.textContent = city.city;

    const p = document.createElement('p');
    p.textContent = city.desc;

    const price = document.createElement('h6');
    price.innerHTML = `Desde: <strong>$${city.price}</strong>`;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary';
    button.textContent = 'Seleccionar';
    button.addEventListener('click', () => selectCity(city.id));

    cardBody.appendChild(h3);
    cardBody.appendChild(p);
    cardBody.appendChild(price);
    cardBody.appendChild(button);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);

    return colDiv;
}

function selectCity(cityId) {
    localStorage.setItem('selectedCity', cityId);
    window.location.href = 'detalle.html';
}

function renderCityDetails() {
    const cityId = localStorage.getItem('selectedCity');
    if (!cityId) return;

    const city = cities.find(c => c.id === parseInt(cityId));
    if (!city) return;

    document.getElementById('city-name').textContent = city.city;
    document.getElementById('city-img').src = city.img;
    document.getElementById('city-desc').textContent = city.desc;
    document.getElementById('city-price').textContent = `Desde: $${city.price}`;

    const hotelSelect = document.getElementById('hotel-select');
    city.hotels.forEach(hotel => {
        const option = document.createElement('option');
        option.value = hotel.price;
        option.textContent = `${hotel.name} - $${hotel.price}`;
        hotelSelect.appendChild(option);
    });

    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', () => {
        const hotelPrice = parseInt(hotelSelect.value) || 0;
        const numDays = parseInt(document.getElementById('num-days').value) || 1;
        const numGuests = parseInt(document.getElementById('num-guests').value) || 1;
        const totalPrice = hotelPrice * numDays * numGuests;
        updateTotalPrice(totalPrice);
    });
        
    const confirmBtn = document.getElementById('confirm-btn');
    confirmBtn.addEventListener('click', () => {
        const hotelPrice = parseInt(hotelSelect.value) || 0;
        const numDays = parseInt(document.getElementById('num-days').value) || 1;
        const numGuests = parseInt(document.getElementById('num-guests').value) || 1;

        const totalPrice = hotelPrice * numDays * numGuests;
        const reservationData = {
            city: document.getElementById('city-name').textContent,
            hotelPrice,
            numDays,
            numGuests,
            totalPrice
        };
        localStorage.setItem('reservationData', JSON.stringify(reservationData));
        window.location.href = 'Resumen.html';

     
    });
}

function updateTotalPrice(price) {
    document.getElementById('total-price').textContent = `$${price}`;
}
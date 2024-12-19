document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    const citiesTableBody = document.querySelector('#cities-table tbody');
    const exploreButton = document.querySelector('.explore-button');
    const images = document.querySelectorAll('main img');

    const hideLoadingOverlay = () => {
        if (loadingOverlay) { // Проверяем, существует ли loadingOverlay
            loadingOverlay.classList.add('hidden');
        }
    };

    const loadCities = async () => {
        try {
            const response = await fetch('http://localhost:3000/cities');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const cities = await response.json();
            displayCities(cities);
        } catch (error) {
            console.error('Failed to fetch cities:', error);
        } finally {
            hideLoadingOverlay();
        }
    };

    const displayCities = (cities) => {
        cities.forEach(city => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${city.name}</td>
              <td>${city.country}</td>
              <td><a href="${city.link}">Подробнее</a></td>
            `;
            citiesTableBody.appendChild(row);
        });
    };

    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            window.location.href = 'cities.html';
        });
    }

    // Загрузка данных только на странице cities.html
    if (citiesTableBody) {
      loadCities();
    } else {
      hideLoadingOverlay();
    }

    // Анимация изображений
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.onload = () => {
                img.classList.add('loaded');
            };
        }
    });
});
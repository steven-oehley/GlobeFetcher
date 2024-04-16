'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Helper Functions

function getJSON(url, errorMessage) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMessage}: ${response.status}`);
    }
    return response.json();
  });
}

function getCountryDataByCoordinates(latitude, longitude) {
  const geocodeUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  return getJSON(geocodeUrl, 'Country Not Found').then(data => {
    const countryName = data.countryName;
    return getCountryData(countryName);
  });
}

function getCountryData(country) {
  const countryInfoUrl = `https://countries-api-836d.onrender.com/countries/name/${country}`;

  return getJSON(countryInfoUrl, 'Country Not Found')
    .then(data => {
      renderCountry(data[0]);
      const firstNeighbour = data[0].borders?.[0];
      if (firstNeighbour) {
        return getJSON(
          `https://countries-api-836d.onrender.com/countries/alpha/${firstNeighbour}`,
          'Country Not Found'
        ).then(neighbourData => renderCountry(neighbourData, 'neighbour'));
      }
    })
    .catch(err => renderError(`Something went wrong! 😢 ${err.message}`))
    .finally(() => (countriesContainer.style.opacity = 1));
}

function renderCountry(data, className = '') {
  const toRender = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', toRender);
}

function renderError(message) {
  countriesContainer.insertAdjacentHTML('beforeend', `<p>${message}</p>`);
}

///////////////////////////////////////
// Event Listener

btn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getCountryDataByCoordinates(latitude, longitude);
      },
      error => {
        renderError(`Geolocation Error: ${error.message}`);
      }
    );
  } else {
    renderError('Geolocation is not supported by your browser');
  }
});

// building a promise instead of just consuming
/* const lotteryPromise = new Promise((resolve, reject) => {
  if (Math.random() >= 0.5) {
    resolve('You WIN'); // promise is fulfilled / resolved
  } else {
    reject('You lost!');
  }
}); // special kind of object

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err)); */

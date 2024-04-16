'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// helper function
function getJSON(url, errorMessage) {
  fetch(`${url}`).then(response => {
    console.log(response);
    // can reject manually if response not ok
    if (!response.ok) {
      throw new Error(`${errorMessage}: ${response.status}`);
    }
    return response.json();
  });
}

function getCountryData(country) {
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country Not Found'
  )
    .then(data => {
      renderCountry(data[0]);
      // get neighbouring country
      const firstNeighbour = data[0].borders?.[0]; // optional chaining to account for no bordering countries (islands for example)
      if (!firstNeighbour) throw new Error('No neighbour found!');
      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${firstNeighbour}`,
        'Country Not Found'
      );
    })

    .then(data => renderCountry(data, 'neighbour')) // if promise fufilled
    .catch(err => renderError(`Something went wrong! 😢 ${err.message}`)) // global catch for errors (like no internet, wont tell you if no data, need to do manually)
    .finally(() => (countriesContainer.style.opacity = 1)); // always called
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
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', toRender);
}

function renderError(message) {
  countriesContainer.insertAdjacentText('beforeend', message);
}

btn.addEventListener('click', () => getCountryData('south africa'));

// building a promise instead of just consuming
/* const lotteryPromise = new Promise((resolve, reject) => {
  if (Math.random() >= 0.5) {
    resolve('You WIN'); // promise is fulfilled / resolved
  } else {
    reject('You lost!');
  }
}); // special kind of object

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err)); */

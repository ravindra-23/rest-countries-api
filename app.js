// Selectors

const countryList = document.querySelector('.country-lists')
const searchEl = document.querySelector('#search')



// Functions

const fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v2/all')
    const countries = await response.json()
    console.log(countries)
    displayCountries(countries)
}

fetchCountries()

const displayCountries = (countries) => {
    countryList.innerHTML = ''

    countries.forEach(country => {
        const {flag, name, population, region, capital} = country
        const countryCard = document.createElement('div')
        countryCard.classList.add('country-card')

        countryCard.innerHTML = 
        `
            <div class="image">
                <img src=${flag} alt="country flag" class="flag-image">
            </div>
            <div class="info">
                <h2 class="country-name">${name}</h2>
                <p class="population"><strong>Population:</strong> ${population.toLocaleString()}</p>
                <p class="region"><strong>Region:</strong> ${region}</p>
                <p class="capital"><strong>Capital:</strong> ${capital}</p>
            </div>    
        `;
        countryList.appendChild(countryCard)
    })
}
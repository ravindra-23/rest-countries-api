// Selectors

const countryList = document.querySelector('.country-lists')
const searchEl = document.querySelector('#search')
const filterBtn = document.getElementById('filter');
const regions = filterBtn.querySelectorAll('li');




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

// Filter by search input

searchEl.addEventListener('keyup', (e) => {
    const input = e.target.value;
    const allCountries = document.querySelectorAll('.country-name')

    allCountries.forEach(country => {
        if(country.innerText.toLowerCase().includes(input.toLowerCase())) {
            country.parentElement.parentElement.style.display = 'block'
        } else {
            country.parentElement.parentElement.style.display = 'none'
        }
    })
})

// Filter by regions

regions.forEach(region => {
    region.addEventListener('click', (e) => {
        const regionText = region.innerText
        const allRegions = document.querySelectorAll('.region')

        allRegions.forEach(countryRegion => {
            if(countryRegion.innerText.includes(regionText) || regionText === 'All') {
                countryRegion.parentElement.parentElement.style.display = 'block'
            } else {
                countryRegion.parentElement.parentElement.style.display = 'none'
            }
        })
        

    })
})


// Event Listeners

filterBtn.addEventListener('click', () => {
	filterBtn.classList.toggle('open');
});
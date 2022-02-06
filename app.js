// Selectors

const countryList = document.querySelector('.country-lists')
const searchEl = document.querySelector('#search')
const filterBtn = document.getElementById('filter');
const regions = filterBtn.querySelectorAll('li');
const modal = document.querySelector('#modal')
const modalContent = document.querySelector('.modal-content')
const closeModal = document.querySelector('.close-btn')
const mainContainer = document.querySelector('.container')
const themeToggle = document.querySelector('.theme-toggler')




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
        const {flags, name, population, region, capital} = country
        const countryCard = document.createElement('div')
        countryCard.classList.add('country-card')

        countryCard.innerHTML = 
        `
            <div class="image">
                <img src=${flags.png} alt="country flag" class="flag-image">
            </div>
            <div class="info">
                <h2 class="country-name">${name}</h2>
                <p class="population"><strong>Population:</strong> ${population.toLocaleString()}</p>
                <p class="region"><strong>Region:</strong> ${region}</p>
                <p class="capital"><strong>Capital:</strong> ${capital}</p>
            </div>    
        `;
        countryList.appendChild(countryCard)

        // Event Listener to display individual Country Details

        countryCard.addEventListener('click', () => {
            console.log('clicked')
            modal.style.display = 'block';
            mainContainer.style.display = 'none'
            showCountryDetails(country)
        })
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

// Function to display individual Country Details in Modal

const showCountryDetails = (country) => {
    const {flag, name, region, subregion, nativeName, population, topLevelDomain, currencies, languages, capital, borders} = country
    const hasBorders = !borders ? false : true;
    modalContent.innerHTML = `
        <div class="flag-section">
            <img src=${flag} alt="country flag" class="country-flag-image"/>
        </div>

        <div class="country-info">
            <div class="country-name">
                <h2>${name}</h2>
            </div>

            <div class="country-details">
                <div class="details-1">
                    <h3 class="native-name detail"><strong>Native Name:</strong> ${nativeName}</h3>
                    <h3 class="country-population detail"><strong>Population:</strong> ${population.toLocaleString()}</h3>
                    <h3 class="region-name detail"><strong>Region:</strong> ${region}</h3>
                    <h3 class="subregion-name detail"><strong>Sub-region:</strong> ${subregion}</h3>
                    <h3 class="capital-name detail"><strong>Capital:</strong> ${capital}</h3>
                </div>

                <div class="details-2">
                    <h3 class="domain-name detail"><strong>Domain Name:</strong> ${topLevelDomain[0]}</h3>
                    <h3 class="currency-name detail"><strong>Currency:</strong> ${currencies.map(currency => currency.code)}</h3>
                    <h3 class="languages-name detail"><strong>Languages:</strong> ${languages.map(language => language.name)}</h3>
                </div>
            </div>

            <div class="borders-section">
                <h3 class="borders"><strong>Borders: </strong>${hasBorders ? borders.map(border => border) : 'No Borders'}</h3>
            </div>
        </div>
    `
}


// Event Listeners


// Filter dropdown list event listener
filterBtn.addEventListener('click', () => {
	filterBtn.classList.toggle('open');
});

// Close modal Event listener
closeModal.addEventListener('click', () => {
    modal.style.display = 'none'
    mainContainer.style.display = 'block'
})

// Dark mode Theme toggler

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
})
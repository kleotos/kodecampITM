const dropDown = document.querySelector('.dropdownMenu');
const dropOptions = document.querySelector('.drop-options');
const toggle = document.querySelector('.toggle');
const icon = document.querySelector('.bx');
const countries = document.querySelector('.countries');
const search = document.querySelector('.search');
const regions = document.querySelectorAll('.regions');
const regionName = document.getElementsByClassName('regionName');




toggle.addEventListener('click', e => {
    document.body.classList.toggle('dark-mode');
      toggle.classList.toggle('dark-mode')
    icon.classList.toggle('bxs-moon');
    dropDown.classList.toggle('dark-mode');
})

dropDown.addEventListener('click', e => {
    dropOptions.classList.toggle('show-options');
});


async function getCountries() {
    const URL = await fetch('https://restcountries.com/v3.1/all');
    const res = await URL.json();
    console.log(res);
    res.forEach(api => {
        showCountry(api); 
    });
}

// ========================== api =====================
getCountries(); 

function showCountry(data) {
    const country = document.createElement('div');
    country.classList.add('country');
    country.innerHTML = `
        <div class="country-img">
            <img src="${data.flags.png}" alt="flag">
        </div>
        <div class="country-details">
            <h5 class="countryName">${data.name.common}</h5>
            <p><strong>Population:</strong> ${data.population}</p> 
            <p class="regionName"><strong>Region:</strong> ${data.region}</p> 
            <p><strong>Capital:</strong> ${data.capital}</p>
        </div>
    `;
    countries.appendChild(country);
}


// ================================ search bar ========================

const countryNames = document.getElementsByClassName('countryName');

search.addEventListener('input', e => {
    Array.from(countryNames).forEach(country => {
        if (country.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            country.parentElement.parentElement.style.display = "grid";
        } else {
            country.parentElement.parentElement.style.display = "none";
        }
    });
});


// ================================ regions =============================

regions.forEach(region => {
    region.addEventListener('click', e => {
        const clickedRegion = e.target.innerText.toLowerCase(); 
        const regionName = document.getElementsByClassName('regionName'); 
        
        Array.from(regionName).forEach(reg => {
            if (clickedRegion === 'all' || reg.innerText.toLowerCase().includes(clickedRegion)) {
                reg.parentElement.parentElement.style.display = 'grid';
            } else {
                reg.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});




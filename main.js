

let searchInput = document.querySelector('#searchPkm');

const mainUrl = 'https://pokeapi.co/api/v2/pokemon/';
let pokemon, number = '';

async function getPoke() {
    pokemon = searchInput.value.toLowerCase()
    console.log('Loading...');
    try {
        let waitPoke = await fetch(`${mainUrl}${pokemon}${number}`)
        let pokeReady = await waitPoke.json();
        console.log('Ready!');
        console.log(pokeReady.name);
        console.log(pokeReady.sprites.front_default);
        for (let i = 0; i < 2; i++) {
            if (pokeReady.types[i] !== undefined) {
                console.log(pokeReady.types[i].type.name);
            }
        }
        console.log(pokeReady);
        let showImg = document.querySelector('#img');
        showImg.innerHTML = `<img src="${pokeReady.sprites.front_default}" alt="${pokemon}">`

    } catch (error) {
        console.error(error);
    }
}

let getPokeBtn = document.querySelector('#test')
getPokeBtn.onclick = () => {
    if (searchInput.value == '') {
        // alert('?')
        console.log('?')
    } else {
        getPoke()
    }
}




// Detects if device is on iOS 
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
    let showModal = document.querySelector('.iosAlertBoxWebApp');
    showModal.style.animation = 'show 8s ease-in-out 2s'
    showModal.style.display = 'flex'
    setTimeout(timeOutModal = () => { showModal.style.display = 'none' }, 10000)
}

// service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        }, function (error) {
            console.error(error);
        });
}
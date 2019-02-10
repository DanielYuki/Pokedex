

const mainUrl = 'https://pokeapi.bastionbot.org/v1/pokemon/658'

async function getPoke() {
    console.log('Loading...');
    try {
        let waitPoke = await fetch(`${mainUrl}`)
        let pokeReady = await waitPoke.json();
        console.log('Ready!');
        console.log(pokeReady.value);
        console.log(pokeReady);

    } catch (error) {
        console.error(error);
    }
}

let getPokeBtn = document.querySelector('#test')
getPokeBtn.onclick = () => {
    console.log('oi')
    getPoke()
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
    .then(function() { 
        console.log('Service Worker Registered'); 
    }, function(error){
        console.error(error);
    });
}
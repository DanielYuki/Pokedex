

let searchInput = document.querySelector('#searchPkm');
let unorderedListPkm = document.querySelector('#pkmList');

let allPkm = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise','Caterpie','Metapod','Butterfree','Weedle','Kakuna','Beedrill','Pidgey','Pidgeotto','Pidgeot','Rattata','Raticate','Spearow','Fearow','Ekans','Arbok','Pikachu','Raichu','Sandshrew','Sandslash','Nidoran♀','Nidorina','Nidoqueen','Nidoran♂','Nidorino','Nidoking','Clefairy','Clefable','Vulpix','Ninetales','Jigglypuff','Wigglytuff','Zubat','Golbat','Oddish','Gloom','Vileplume','Paras','Parasect','Venonat','Venomoth','Diglett','Dugtrio','Meowth','Persian','Psyduck','Golduck','Mankey','Primeape','Growlithe','Arcanine','Poliwag','Poliwhirl','Poliwrath','Abra','Kadabra','Alakazam','Machop','Machoke','Machamp','Bellsprout','Weepinbell','Victreebel','Tentacool','Tentacruel','Geodude','Graveler','Golem','Ponyta','Rapidash','Slowpoke','Slowbro','Magnemite','Magneton',"Farfetch'd",'Doduo','Dodrio','Seel','Dewgong','Grimer','Muk','Shellder','Cloyster','Gastly','Haunter','Gengar','Onix','Drowzee','Hypno','Krabby','Kingler','Voltorb','Electrode','Exeggcute','Exeggutor','Cubone','Marowak','Hitmonlee','Hitmonchan','Lickitung','Koffing','Weezing','Rhyhorn','Rhydon','Chansey','Tangela','Kangaskhan',    'Horsea','Seadra','Goldeen','Seaking','Staryu','Starmie','Mr.Mime','Scyther','Jynx','Electabuzz','Magmar','Pinsir','Tauros','Magikarp','Gyarados','Lapras','Ditto',    'Eevee','Vaporeon','Jolteon','Flareon','Porygon','Omanyte','Omastar','Kabuto','Kabutops','Aerodactyl','Snorlax','Articuno','Zapdos',    'Moltres','Dratini','Dragonair','Dragonite','Mewtwo','Mew'];
function filterFunction() {
    let filter, li, i, txtValue;
    filter = searchInput.value.toLowerCase();
    li = unorderedListPkm.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function listCreator() {
    for (let i = 0; i < allPkm.length; i++) {
        let list = document.createElement('li');
        let listContainerNumber = document.createElement('span');
        let listContentNumber = document.createTextNode(`#${i + 1}`);
        let listContentName = document.createTextNode(allPkm[i]);
        listContainerNumber.appendChild(listContentNumber);
        list.appendChild(listContainerNumber)
        list.appendChild(listContentName);
        unorderedListPkm.appendChild(list);
    }
}


// GET POKEMON INFORMATION
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
// ------------------------

let getPokeBtn = document.querySelector('#test')
getPokeBtn.onclick = () => {
    if (searchInput.value == '') {
        // alert('?')
        console.log('?')
    } else {
        getPoke()
    }
}

listCreator()


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
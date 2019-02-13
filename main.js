

let searchInput = document.querySelector('#searchPkm');
let pkmCardsList = document.querySelector('#pkmList');

let allPkm = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran♀', 'Nidorina', 'Nidoqueen', 'Nidoran♂', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', "Farfetch'd", 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr.Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew'];
function filterFunction() {
    let filter, li, i, txtValue;
    filter = searchInput.value.toLowerCase().replace(/\s/g, '');
    li = pkmCardsList.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// function listCreator() {
//     for (let i = 0; i < allPkm.length; i++) {
//         let list = document.createElement('li');
//         let listContainerNumber = document.createElement('span');
//         let listContentNumber = document.createTextNode(`#${i + 1}`);
//         let listContentName = document.createTextNode(allPkm[i]);
//         listContainerNumber.appendChild(listContentNumber);
//         list.appendChild(listContainerNumber)
//         list.appendChild(listContentName);
//         pkmCardsList.appendChild(list);
//     }
// }


// GET POKEMON INFORMATION
const mainUrl = 'https://pokeapi.co/api/v2/pokemon/';
let pokemon = '';
let number = 1

let until = 120
async function getPoke(mainUrl, pokemon, number) {
    while (until < allPkm.length) {
        pokemon = searchInput.value.toLowerCase()
        console.log('Loading...');
        try {
            let waitPoke = await fetch(`${mainUrl}${pokemon}${number}`)
            let pokeReady = await waitPoke.json();

            let pokemonName = pokeReady.name;
            let pokemonSprite = pokeReady.sprites.front_default;
            let pokemonSpriteBack = pokeReady.sprites.back_default;
            let pokemonType = [];

            console.log(pokeReady.name);
            console.log(pokeReady.sprites.front_default);
            console.log(pokeReady.sprites.back_default);
            console.log(pokeReady.height / 10)
            console.log(pokeReady.weight / 10)

            for (let i = 0; i < pokeReady.types.length; i++) {
                if (pokeReady.types[i] !== undefined) {
                    pokemonType.push(pokeReady.types[i].type.name)
                }
            }

            console.log(typeof (pokemonType));
            console.log(pokemonType);
            console.log(pokeReady);
            pkmCreator(pokemonName, pokemonSprite, pokemonType, number, pokemonSpriteBack)
        } catch (error) {
            console.error(error);
        }
        number++
        until++
        await getPoke(mainUrl, pokemon, number)
    }
}
// ------------------------

let n = 1
let getPokeBtn = document.querySelector('#test')
getPokeBtn.onclick = () => {
    if (searchInput.value == '') {
        // alert('?')
        getPoke(mainUrl, pokemon, n);
        n++
        console.log('?')
    } else {
        getPoke()
    }


}


function pkmCreator(name, sprite, type, number, spriteBack) {
    // CARD TEMPLATE
    let createCard = document.createElement('li');
    let createCardFront = document.createElement('div');
    let createCardBack = document.createElement('div');

    // CARD FRONT
    let createSprite = document.createElement('div');
    let createName = document.createElement('span');
    let createType = document.createElement('div');

    //CARD BACK
    let createSpriteBack = document.createElement('div');

    // ADDING CLASSES TO THE CARD ELEMENTS
    createCard.classList.add('card');
    createCardFront.classList.add('front');
    createCardBack.classList.add('back');

    createSprite.classList.add(`imgPkm${number}`)
    createSpriteBack.classList.add(`imgPkmBack${number}`)
    createType.classList.add('pokemonTypes')

    // ADDING CONTENT INFO
    let nameContent = document.createTextNode(`${name}`);

        // POKEMON TYPE CONSTRUCTOR
    for (let i = 0; i < type.length; i++) {
        let typeContent = document.createTextNode(`${type[i]}`);
        let typesDiv = document.createElement('div');
        typesDiv.appendChild(typeContent);
        createType.appendChild(typesDiv);
    }

    createName.appendChild(nameContent);

    // CARD FRONT
    createCardFront.appendChild(createSprite);
    createCardFront.appendChild(createName);
    createCardFront.appendChild(createType);

    // CARD BACK
    createCardBack.appendChild(createSpriteBack);


    createCard.appendChild(createCardFront)
    createCard.appendChild(createCardBack)

    pkmCardsList.appendChild(createCard);

    // ADD IMG FRONT
    let spriteContent = document.querySelector(`.imgPkm${number}`);
    spriteContent.innerHTML = `<img src="${sprite}" alt="${name}">`
    // ADD IMG BACK
    let spriteContentBack = document.querySelector(`.imgPkmBack${number}`);
    spriteContentBack.innerHTML = `<img src="${spriteBack}" alt="${name}">`

    // CARD FLIP EFFECT
    let showCard = document.querySelectorAll('.card');
    for (cards of showCard) {
        cards.onclick = flip;
    }
}

function flip() {
    this.firstChild.nextSibling.classList.toggle('backFlip')
    this.lastChild.previousSibling.classList.toggle('frontFlip')
}

// for (let i = 1; i < 18; i++) {
//     getPoke(mainUrl, pokemon, i)
// }

getPoke(mainUrl, pokemon, number)

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

let searchInput = document.querySelector('#searchPkm');
let pkmCardsList = document.querySelector('#pkmList');

let showTypeFilter = document.querySelector('#showTypeFilter');
showTypeFilter.onclick = () => {
    let types = document.querySelector('#types');
    types.classList.toggle('showHide');
    let btnDetail = document.querySelector('#arrowBtn');
    btnDetail.classList.toggle('rotate')
}

let allPkmTypes = ['normal', 'grass', 'fire', 'water', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'steel', 'fairy']

let typeFiltering = document.querySelectorAll('.typeFiltering');
for (types of typeFiltering) {
    types.classList.add('grayScaleFiltering')
    types.onclick = filterThisType;
}

function filterThisType() {
    let filter, card, cardTypeValue, type;
    if (!this.classList.contains('grayScaleFiltering')) {
        filter = '';
    } else {
        filter = this.innerText.toLowerCase();
    }
    card = pkmCardsList.getElementsByTagName("li");
    type = pkmCardsList.querySelectorAll('.pokemonTypes');

    for (let i = 0; i < card.length; i++) {
        cardTypeValue = type[i].textContent || type[i].innerText;
        if (cardTypeValue.toLowerCase().indexOf(filter) > -1) {
            card[i].style.display = "";
        } else {
            card[i].style.display = "none";
        }
        // console.log(filter)
    }
    this.classList.toggle('grayScaleFiltering');
}

// const allGen1Pkm = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran♀', 'Nidorina', 'Nidoqueen', 'Nidoran♂', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', "Farfetch'd", 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr.Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew'];

function filterFunction() {
    let filter, li, txtValue, name, number, type;
    filter = searchInput.value.toLowerCase().replace(/\s/g, '');
    li = pkmCardsList.getElementsByTagName("li");
    //FILTER TYPES
    name = pkmCardsList.getElementsByTagName("h4");
    number = pkmCardsList.getElementsByTagName("span");
    type = pkmCardsList.querySelectorAll('.pokemonTypes');

    for (let i = 0; i < li.length; i++) {
        if (filter == parseInt(filter)) {
            txtValue = number[i].textContent || number[i].innerText;
        } else if (allPkmTypes.indexOf(filter) > -1) {
            txtValue = type[i].textContent || type[i].innerText;
        }
        else {
            txtValue = name[i].textContent || name[i].innerText;
        }
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
        console.log(filter)
    }
}

// GET POKEMON INFORMATION
const mainUrl = 'https://pokeapi.co/api/v2/pokemon/';
let gen1 = 151;
let pokemon = '';
let number = 1

async function getPoke(mainUrl, number) {
    while (number <= gen1) {
        pokemon = searchInput.value.toLowerCase()

        try {
            let waitPoke = await fetch(`${mainUrl}${number}`)
            let pokeReady = await waitPoke.json();

            let pokemonName = pokeReady.name;
            let pokemonType = [];
            let pokemonHeight = pokeReady.height / 10;
            let pokemonWeight = pokeReady.weight / 10;
            let pokemonSprite = pokeReady.sprites.front_default;
            let pokemonSpriteBack = pokeReady.sprites.back_default;

            for (let i = 0; i < pokeReady.types.length; i++) {
                if (pokeReady.types[i] !== undefined) {
                    pokemonType.push(pokeReady.types[i].type.name)
                }
            }

            // console.log(pokeReady);
            pkmCreator(pokemonName, pokemonSprite, pokemonType, number, pokemonSpriteBack, pokemonHeight, pokemonWeight)
        } catch (error) {
            console.error(error);
        }
        number++
    }
}
// ------------------------

function pkmCreator(name, sprite, type, number, spriteBack, height, weight) {
    // CARD TEMPLATE
    let createCard = document.createElement('li');
    let createCardFront = document.createElement('div');
    let createCardBack = document.createElement('div');

    // CARD FRONT
    let createSprite = document.createElement('div');
    let createName = document.createElement('h4');
    createName.innerText = (`${name}`)
    let createType = document.createElement('div');

    //CARD BACK
    let createSpriteBack = document.createElement('div');
    let createPkmNumber = document.createElement('span');
    createPkmNumber.innerText = (`#${number}`);
    let createPkmHeightValue = document.createElement('div');
    let createPkmWeightValue = document.createElement('div');
    //details
    let createPkmHeight = document.createElement('b');
    createPkmHeight.innerText = 'Height: '
    let createPkmWeight = document.createElement('b');
    createPkmWeight.innerText = 'Weight: '

    // ADDING CLASSES TO THE CARD ELEMENTS
    createCard.classList.add('card');
    createCardFront.classList.add('front');
    createCardBack.classList.add('back');

    createSprite.classList.add(`imgPkm${number}`)
    createSpriteBack.classList.add(`imgPkmBack${number}`)
    createType.classList.add('pokemonTypes')

    // ADDING CONTENT INFO
    let pkmHeightContent = document.createTextNode(`${height}m`);
    let pkmWeightContent = document.createTextNode(`${weight}kg`);

    // POKEMON TYPE CONSTRUCTOR
    for (let i = 0; i < type.length; i++) {
        let typeContent = document.createTextNode(`${type[i]}`);
        let typesDiv = document.createElement('h6');
        typesDiv.appendChild(typeContent);
        createType.appendChild(typesDiv);

        //CSS Details...
        switch (typesDiv.innerHTML || typesDiv.textContent) {
            case 'normal':
                typesDiv.classList.add('normalType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #959588'
                    createCardBack.style.backgroundColor = '#d6d6cc'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #959588'
                }
                createCardFront.style.border = '2px solid #959588'
                createCardFront.style.backgroundColor = '#d6d6cc'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #959588'
                break;
            case "grass":
                typesDiv.classList.add('grassType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #71ad40'
                    createCardBack.style.backgroundColor = '#bbe896'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #71ad40'
                }
                createCardFront.style.border = '2px solid #71ad40'
                createCardFront.style.backgroundColor = '#bbe896'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #71ad40'
                break;
            case 'fire':
                typesDiv.classList.add('fireType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #c84434'
                    createCardBack.style.backgroundColor = '#fc998d'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #c84434'
                }
                createCardFront.style.border = '2px solid #c84434'
                createCardFront.style.backgroundColor = '#fc998d'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #c84434'
                break;
            case 'water':
                typesDiv.classList.add('waterType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #438bcc'
                    createCardBack.style.backgroundColor = '#98ceff'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #438bcc'
                }
                createCardFront.style.border = '2px solid #438bcc'
                createCardFront.style.backgroundColor = '#98ceff'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #438bcc'
                break;
            case 'fighting':
                typesDiv.classList.add('fightningType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #884434'
                    createCardBack.style.backgroundColor = '#cc998d'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #884434'
                }
                createCardFront.style.border = '2px solid #884434'
                createCardFront.style.backgroundColor = '#cc998d'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #884434'
                break;
            case 'flying':
                typesDiv.classList.add('flyingType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #5e83cc'
                    createCardBack.style.backgroundColor = '#acc8ff'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #5e83cc'
                }
                createCardFront.style.border = '2px solid #5e83cc'
                createCardFront.style.backgroundColor = '#acc8ff'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #5e83cc'
                break;
            case 'poison':
                typesDiv.classList.add('poisonType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #86487f'
                    createCardBack.style.backgroundColor = '#ca9cc5'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #86487f'
                }
                createCardFront.style.border = '2px solid #86487f'
                createCardFront.style.backgroundColor = '#ca9cc5'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #86487f'
                break;
            case 'ground':
                typesDiv.classList.add('groundType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #bba043'
                    createCardBack.style.backgroundColor = '#f2de98'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #bba043'
                }
                createCardFront.style.border = '2px solid #bba043'
                createCardFront.style.backgroundColor = '#f2de98'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #bba043'
                break;
            case 'rock':
                typesDiv.classList.add('rockType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #a4975a'
                    createCardBack.style.backgroundColor = '#e1d7a9'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #a4975a'
                }
                createCardFront.style.border = '2px solid #a4975a'
                createCardFront.style.backgroundColor = '#e1d7a9'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #a4975a'
                break;
            case 'bug':
                typesDiv.classList.add('bugType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #9ca814'
                    createCardBack.style.backgroundColor = '#dbe475'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #9ca814'
                }
                createCardFront.style.border = '2px solid #9ca814'
                createCardFront.style.backgroundColor = '#dbe475'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #9ca814'
                break;
            case 'ghost':
                typesDiv.classList.add('ghostType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #605caa'
                    createCardBack.style.backgroundColor = '#aeabe5'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #605caa'
                }
                createCardFront.style.border = '2px solid #605caa'
                createCardFront.style.backgroundColor = '#aeabe5'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #605caa'
                break;
            case 'electric':
                typesDiv.classList.add('electricType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #cab52c'
                    createCardBack.style.backgroundColor = '#fdee87'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #cab52c'
                }
                createCardFront.style.border = '2px solid #cab52c'
                createCardFront.style.backgroundColor = '#fdee87'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #cab52c'
                break;
            case 'psychic':
                typesDiv.classList.add('psychicType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #c34d8e'
                    createCardBack.style.backgroundColor = '#f8a0d0'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #c34d8e'
                }
                createCardFront.style.border = '2px solid #c34d8e'
                createCardFront.style.backgroundColor = '#f8a0d0'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #c34d8e'
                break;
            case 'ice':
                typesDiv.classList.add('iceType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #78c1cc'
                    createCardBack.style.backgroundColor = '#c0f7ff'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #78c1cc'
                }
                createCardFront.style.border = '2px solid #78c1cc'
                createCardFront.style.backgroundColor = '#c0f7ff'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #78c1cc'
                break;
            case 'dragon':
                typesDiv.classList.add('dragonType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #6c5ccc'
                    createCardBack.style.backgroundColor = '#b7abff'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #6c5ccc'
                }
                createCardFront.style.border = '2px solid #6c5ccc'
                createCardFront.style.backgroundColor = '#b7abff'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #6c5ccc'
                break;
            case 'dark':
                typesDiv.classList.add('darkType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #684b3c'
                    createCardBack.style.backgroundColor = '#b49e93'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #684b3c'
                }
                createCardFront.style.border = '2px solid #684b3c'
                createCardFront.style.backgroundColor = '#b49e93'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #684b3c'
                break;
            case 'steel':
                typesDiv.classList.add('steelType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #9d9cb0'
                    createCardBack.style.backgroundColor = '#dcdbea'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #9d9cb0'
                }
                createCardFront.style.border = '2px solid #9d9cb0'
                createCardFront.style.backgroundColor = '#dcdbea'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #9d9cb0'
                break;
            case 'fairy':
                typesDiv.classList.add('fairyType')
                if (createType.childElementCount == 1) {
                    createCardBack.style.border = '2px solid #c78ccc'
                    createCardBack.style.backgroundColor = '#fbcfff'
                    createCardBack.style.boxShadow = 'inset 0px 0px 25px 3px #c78ccc'
                }
                createCardFront.style.border = '2px solid #c78ccc'
                createCardFront.style.backgroundColor = '#fbcfff'
                createCardFront.style.boxShadow = 'inset 0px 0px 25px 3px #c78ccc'
                break;
            default:
                console.error(error)
        }
    }

    // GATHERING CONTENTS
    createPkmHeightValue.appendChild(createPkmHeight);
    createPkmHeightValue.appendChild(pkmHeightContent);
    createPkmWeightValue.appendChild(createPkmWeight);
    createPkmWeightValue.appendChild(pkmWeightContent);

    // CARD FRONT
    createCardFront.appendChild(createSprite);
    createCardFront.appendChild(createName);
    createCardFront.appendChild(createType);

    // CARD BACK
    createCardBack.appendChild(createSpriteBack);
    createCardBack.appendChild(createPkmNumber);
    createCardBack.appendChild(createPkmHeightValue);
    createCardBack.appendChild(createPkmWeightValue);


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

getPoke(mainUrl, number)



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
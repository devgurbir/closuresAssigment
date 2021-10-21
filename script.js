const apiKey = '2b096784';
const baseUri = `http://www.omdbapi.com/?apikey=${apiKey}&`;

window.addEventListener('load', () => {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', debounce(makeSearch, 300))

    searchBar.addEventListener('focusout', () => {
        event.target.style.borderBottom = "1px solid black"
        const parent = document.querySelector('.container')

    const existingAutosuggest = document.querySelector('.autosuggest');
    if(existingAutosuggest){
        parent.removeChild( existingAutosuggest )
    }
        // event.target.style.backgroundColor =  "yellow"
    })
})


function makeSearch(event){
    event.target.style.borderBottom = "0px"

    return fetch(`${baseUri}&s=${event.target.value}`)
    .then( res => res.json() )
    .then( res => handleResults(res) )
}

function handleResults(data){
    
    const {
        Search, totalResults, Response, Error
    } = data;

    const parent = document.querySelector('.container')

    const existingAutosuggest = document.querySelector('.autosuggest');
    if(existingAutosuggest){
        parent.removeChild( existingAutosuggest )
    }

    const autoSuggestDiv = document.createElement('div');
    autoSuggestDiv.className = 'autosuggest'

    if(Response == 'True'){
        
        const autoSuggestUL = document.createElement('ul');
        for( let item of Search){
            // console.log(item)
            const autoSuggestLI = document.createElement('li');
            const autoSuggestA = document.createElement('a');
            autoSuggestA.textContent = item.Title;
            autoSuggestA.setAttribute('href', `https://www.imdb.com/title/${item.imdbID}/`)
            autoSuggestLI.append(autoSuggestA)

            autoSuggestUL.append(autoSuggestLI)
        }

        autoSuggestDiv.append(autoSuggestUL);
    }
    else{
        autoSuggestDiv.textContent = Error;
    }

    
    parent.appendChild(autoSuggestDiv)
}

const debounce = (func, delay) => {
    let id;
    return (...args) => {
        id && clearTimeout(id);
        id = setTimeout( () => {
            func.apply(null, args)
        }, delay)
    }
}
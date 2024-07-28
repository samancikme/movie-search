const searchBar = document.querySelector("form")
const movieCard = document.querySelector(".main-content")
const filterData = document.querySelector("#filter")
const loadingIndicator = document.querySelector("#loading")

let allMovie = []




filterData.addEventListener("change" , (a) => {
    const changed = a.target.value
    const changedMovie = allMovie.filter(item => {
        if(item.Type === changed){
            item.Type === changed
        }else{
            return item
        }
    })
    renderMovie(changedMovie)
})









async function getMovie(url) {
    try{
        showLoading()
        console.log("loading...")
        const res = await fetch(url)
        const data = await res.json()
        console.log(data.Search)
        allMovie = [...data.Search]
        renderMovie(data.Search)
    }
    catch (err){
        console.log(err)
    }finally {
        hideLoading()
    }
}

getMovie("https://omdbapi.com/?s=spider&type=&apikey=9446507")

function renderMovie(array) {
    movieCard.innerHTML = ""
    array.forEach(movie => {
      movieCard.innerHTML +=
        `
        <div class="card">

            <img src="${movie.Poster}" >

            <div class="year">${movie.Year}</div>

            <div class="type">${movie.Type}</div>

            <h1>${movie.Title}</h1>
        </div>
        `  
    })
}
















searchBar.addEventListener("submit" , (e) => {
    e.preventDefault()
    const value = searchBar["input"].value.trim()
    if (value.length > 0 ) {
        getMovie(`https://omdbapi.com/?s=${value}&type=&apikey=9446507`)
    }else{
        searchBar["input"].focus()
        searchBar["input"].style.borderColor = "red"
        searchBar["input"].addEventListener("keydown" , () => {
            searchBar["input"].style.borderColor = "green"
        })
    }
})
function showLoading() {
    loadingIndicator.classList.remove("hidden")
}

function hideLoading() {
    loadingIndicator.classList.add("hidden")
}
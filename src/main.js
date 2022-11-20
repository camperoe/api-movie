const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {  'Content-Type': 'application/'},
    params: {
        'api_key': API_KEY
    }
})
//Utils
function createMovies(movies, container) {
    container.innerHTML = ''

    movies.forEach( movie => {

        const movieContainer = document.createElement('div')

        movieContainer.classList.add('movie-container')
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie= ${movie.id}`
        })

        const movieImg = document.createElement('img')
        
        movieImg.classList.add('movie-img')

        movieImg.setAttribute('alt', movie.title)

        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)

        movieContainer.append(movieImg)
        
        container.append(movieContainer)

    })
}

function createCategories(categories, container) {
    container.innerHTML = '' 

    categories.forEach( category => {

        const categoryContainer = document.createElement('div')

        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3')
        
        categoryTitle.classList.add('category-title')

        categoryTitle.setAttribute('id', 'id' + category.id)

        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        })

        const categoryTitleText = document.createTextNode(category.name)

        categoryTitle.append(categoryTitleText)
        categoryContainer.append(categoryTitle)
        container.append(categoryContainer)
    })
}
//Llamados
const API_URL = 'https://api.themoviedb.org/3'

async function getTrendingMoviesPreview() {
    const res = await fetch(`${API_URL}/trending/all/day?${API_KEY}`)
    const data = await res.json()

    const movies =  data.results

    createMovies(movies, trendingMoviesPreviewList)
}

async function getCategoriesPreview() {
    const res = await fetch(`${API_URL}/genre/movie/list?${API_KEY}`)
    const data = await res.json()

    const categories =  data.genres

    createCategories(categories, categoriesPreviewList)
}

async function getMoviesByCategory(id) {
    const res = await fetch(`${API_URL}/discover/movie?${API_KEY}&with_genres=${id}`)
    const data = await res.json()

    const movies =  data.results
    createMovies(movies, genericSection)
}

async function getMoviesBySearch(query) {
    const res = await fetch(`${API_URL}/search/multi?${API_KEY}&query=${query}`)
    const data = await res.json()

    const movies =  data.results

    console.log(data.results);
    createMovies(movies, genericSection)
}

async function getTrendingMovies() {
    const res = await fetch(`${API_URL}/trending/all/day?${API_KEY}`)
    const data = await res.json()

    const movies =  data.results

    createMovies(movies, genericSection)
}

async function getMovieById(id) {
    const res = await fetch(`${API_URL}/movie/${id}?${API_KEY}`)
    const data = await res.json()

    const movie =  data

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})`

    movieDetailTitle.textContent = movie.title
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average

    createCategories(movie.genres, movieDetailCategoriesList)

    getRelatedMoviesId(id)
}

async function getRelatedMoviesId(id) {
    const res = await fetch(`${API_URL}/movie/${id}/similar?${API_KEY}`)
    const data = await res.json()

    const relatedMovies =  data.results

    createMovies(relatedMovies, relatedMoviesContainer)
}